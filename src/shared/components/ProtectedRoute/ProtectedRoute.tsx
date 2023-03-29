import { observer } from "mobx-react-lite";
import { PropsWithChildren, useEffect } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "src/context/auth.context";

interface ProtectedRoutesProps {}

const ProtectedRoute = observer(
  ({ children }: PropsWithChildren<ProtectedRoutesProps>) => {
    const { authStore } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if (!authStore.isAuth)
        navigate({
          pathname: "/login",
          search: createSearchParams({
            redirectTo: `${location.pathname}${location.search}`,
          }).toString(),
        });
    }, [authStore.isAuth, location.pathname]);

    return <>{authStore.isAuth ? children : null}</>;
  }
);

export default ProtectedRoute;
