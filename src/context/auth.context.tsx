import { createContext, PropsWithChildren, useContext, useRef } from "react";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { IAuthStore } from "src/infrastructure/stores/auth.store";
import { container } from "tsyringe";

const AuthContext = createContext<{
  authStore: IAuthStore;
}>({} as any);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const authStore = useRef(
    container.resolve<IAuthStore>(SERVICE_KEYS.AUTH_STORE)
  );

  return (
    <AuthContext.Provider
      value={{
        authStore: authStore.current,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
