import { useMemo } from "react";
import { Box, LinearProgress } from "@mui/material";

import "./App.css";
import { usePendingRequest } from "./context/pending-request.context";
import { observer } from "mobx-react-lite";
import { AuthProvider, useAuth } from "./context/auth.context";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login/Login";
import { SnackbarProvider } from "notistack";
import { NotificationProvider } from "./context/notification.context";
import Notifier from "./shared/components/Notifier/Notifier";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute";
import { container } from "tsyringe";
import { IAuthStore } from "./infrastructure/stores/auth.store";
import { SERVICE_KEYS } from "./infrastructure/service-keys";
import { urlQueryParser } from "./utils/urlQueryParser";

const authStore = container.resolve<IAuthStore>(SERVICE_KEYS.AUTH_STORE);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        path: "login",
        loader: async (args) => {
          const { redirectTo } = urlQueryParser(args.request.url) as {
            redirectTo?: string;
          };

          await authStore.getUser();

          if (authStore.isAuth) {
            return redirect("/home");
          }

          if (redirectTo) redirect(redirectTo);

          return null;
        },
        element: <Login />,
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);

const App = observer(() => {
  const { pendingRequestStore } = usePendingRequest();
  const { authStore } = useAuth();

  const showLoader = useMemo(
    () => pendingRequestStore.pendingRequestList.length > 0,
    [pendingRequestStore.pendingRequestList.length]
  );

  console.log(pendingRequestStore.pendingRequestList);

  return (
    <Box className="App" position="relative">
      <Box width="100vw" position="fixed" zIndex={12001}>
        <LinearProgress
          sx={{
            visibility: showLoader ? "visible" : "hidden",
            zIndex: 12001,
          }}
        />
      </Box>
      <SnackbarProvider
        maxSnack={10}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        disableWindowBlurListener={true}
      >
        <NotificationProvider>
          <Notifier />

          <RouterProvider router={router} />
        </NotificationProvider>
      </SnackbarProvider>
    </Box>
  );
});

export default App;
