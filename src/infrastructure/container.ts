import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { container } from "tsyringe";
import { IAuthService } from "./interfaces/auth-service.interface";
import { ICategoryRepository } from "./interfaces/category-repository.interface";
import { ILinkRepository } from "./interfaces/link-repository.interface";
import {
  INotificationStore,
  NotificationStore,
} from "./interfaces/notification.store";
import { ITodoRepository } from "./interfaces/todo-repository.interface";
import { ITodoStore } from "./interfaces/todo-store.interface";
import { CategoryRepository } from "./repositories/category.repository";
import { LinkRepository } from "./repositories/link.repository";
import { TodoRepository } from "./repositories/todo.repository";
import { SERVICE_KEYS } from "./service-keys";
import { AuthService } from "./services/auth/auth.service";
import {
  CreateCategoryService,
  ICreateCategoryService,
} from "./services/category/create-category.service";
import { AuthStore, IAuthStore } from "./stores/auth.store";
import {
  IListCategoriesStore,
  ListCategoriesStore,
} from "./stores/list-categories.store";
import { IListLinkStore, ListLinkStore } from "./stores/list-link.store";
import {
  IPendingRequestStore,
  PendingRequestStore,
} from "./stores/pending-request.store";
import { TodoStore } from "./stores/todo.store";
import { IHttpClient } from "./interfaces/http-client.interface";
import { IHttpService } from "./interfaces/http-service.interface";
import { AxiosHttpClient } from "./services/http/http-client";
import { HttpService } from "./services/http/http.service";
import { SummaryRepository } from "./repositories/summary.repository";
import { SummaryService } from "./services/summary/summary.service";
import { ITrackingService } from "./interfaces/tracking-service.interface";
import { TrackingService } from "./services/tracking/tracking.service";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = getFirestore(app);

container.register(SERVICE_KEYS.FIREBASE_APP, { useValue: app });
container.register(SERVICE_KEYS.FIREBASE_AUTH, { useValue: auth });
container.register(SERVICE_KEYS.FIREBASE_DB, { useValue: db });

container.registerSingleton<IHttpClient>(
  SERVICE_KEYS.HTTP_CLIENT,
  AxiosHttpClient
);

container.registerSingleton<IHttpService>(
  SERVICE_KEYS.HTTP_SERVICE,
  HttpService
);

container.registerSingleton<ITrackingService>(
  SERVICE_KEYS.TRACKING_SERVICE,
  TrackingService
);

container.registerSingleton(SERVICE_KEYS.SUMMARY_REPOSITORY, SummaryRepository);

container.registerSingleton(SERVICE_KEYS.SUMMARY_SERVICE, SummaryService);

container.registerSingleton<IAuthService>(
  SERVICE_KEYS.AUTH_SERVICE,
  AuthService
);

container.registerSingleton<INotificationStore>(
  SERVICE_KEYS.NOTIFICATION_STORE,
  NotificationStore
);

container.registerSingleton<IAuthStore>(SERVICE_KEYS.AUTH_STORE, AuthStore);

container.registerSingleton<ICategoryRepository>(
  SERVICE_KEYS.CATEGORY_REPOSITORY,
  CategoryRepository
);

container.registerSingleton<ICreateCategoryService>(
  SERVICE_KEYS.CREATE_CATEGORY_SERVICE,
  CreateCategoryService
);

container.registerSingleton<IListCategoriesStore>(
  SERVICE_KEYS.LIST_CATEGORY_STORE,
  ListCategoriesStore
);

container.registerSingleton<ILinkRepository>(
  SERVICE_KEYS.LINK_REPOSITORY,
  LinkRepository
);

container.registerSingleton<IListLinkStore>(
  SERVICE_KEYS.LIST_LINK_STORE,
  ListLinkStore
);

container.registerSingleton<ITodoRepository>(
  SERVICE_KEYS.TODO_REPOSITORY,
  TodoRepository
);

container.registerSingleton<ITodoStore>(SERVICE_KEYS.TODO_STORE, TodoStore);

container.registerSingleton<IPendingRequestStore>(
  SERVICE_KEYS.PENDING_REQUEST_STORE,
  PendingRequestStore
);
