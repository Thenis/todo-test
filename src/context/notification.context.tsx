import { container } from "tsyringe";
import { createContext, PropsWithChildren, useContext } from "react";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { INotificationStore } from "src/infrastructure/interfaces/notification.store";

const notificationStore = container.resolve<INotificationStore>(
  SERVICE_KEYS.NOTIFICATION_STORE
);

const NotificationContext = createContext<{
  notificationStore: INotificationStore;
}>({ notificationStore });

export const NotificationProvider = ({ children }: PropsWithChildren) => {
  return (
    <NotificationContext.Provider value={{ notificationStore }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("Notification context is not found");
  }

  return context;
};
