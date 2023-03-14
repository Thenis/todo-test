import { container } from "tsyringe";
import { ITodoRepository } from "./interfaces/todo-repository.interface";
import { ITodoStore } from "./interfaces/todo-store.interface";
import { TodoRepository } from "./repositories/todo.repository";
import { SERVICE_KEYS } from "./service-keys";
import { TodoStore } from "./stores/todo.store";

container.registerSingleton<ITodoRepository>(
  SERVICE_KEYS.TODO_REPOSITORY,
  TodoRepository
);

container.registerSingleton<ITodoStore>(SERVICE_KEYS.TODO_STORE, TodoStore);
