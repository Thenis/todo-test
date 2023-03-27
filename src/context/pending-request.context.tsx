import { createContext, PropsWithChildren, useContext } from "react";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { IPendingRequestStore } from "src/infrastructure/stores/pending-request.store";
import { container } from "tsyringe";

const pendingRequestStore = container.resolve<IPendingRequestStore>(
  SERVICE_KEYS.PENDING_REQUEST_STORE
);

const PendingRequestContext = createContext<{
  pendingRequestStore: IPendingRequestStore;
}>({ pendingRequestStore });

export const PendingRequestProvider = ({ children }: PropsWithChildren) => {
  return (
    <PendingRequestContext.Provider value={{ pendingRequestStore }}>
      {children}
    </PendingRequestContext.Provider>
  );
};

export const usePendingRequest = () => {
  const context = useContext(PendingRequestContext);

  if (!context) {
    throw new Error("Pending request context is not found");
  }

  return context;
};
