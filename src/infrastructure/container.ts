import { container } from "tsyringe";
import { IAuthService } from "./interfaces/auth-service.interface";
import {
  INotificationStore,
  NotificationStore,
} from "./interfaces/notification.store";
import { ITodoRepository } from "./interfaces/todo-repository.interface";
import { ITodoStore } from "./interfaces/todo-store.interface";
import { TodoRepository } from "./repositories/todo.repository";
import { SERVICE_KEYS } from "./service-keys";
import { AuthService } from "./services/auth.service";
import { AuthStore, IAuthStore } from "./stores/auth.store";
import {
  IPendingRequestStore,
  PendingRequestStore,
} from "./stores/pending-request.store";
import { TodoStore } from "./stores/todo.store";

container.registerSingleton<IAuthService>(
  SERVICE_KEYS.AUTH_SERVICE,
  AuthService
);

container.registerSingleton<INotificationStore>(
  SERVICE_KEYS.NOTIFICATION_STORE,
  NotificationStore
);

container.registerSingleton<IAuthStore>(SERVICE_KEYS.AUTH_STORE, AuthStore);

container.registerSingleton<ITodoRepository>(
  SERVICE_KEYS.TODO_REPOSITORY,
  TodoRepository
);

container.registerSingleton<ITodoStore>(SERVICE_KEYS.TODO_STORE, TodoStore);

container.registerSingleton<IPendingRequestStore>(
  SERVICE_KEYS.PENDING_REQUEST_STORE,
  PendingRequestStore
);
