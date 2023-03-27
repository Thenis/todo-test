import { CancellablePromise } from "mobx/dist/internal";
import { TodoViewModel } from "../viewmodels/todo.viewmodel";

export interface ITodoStore {
  viewModel: TodoViewModel | null;

  fetch(): CancellablePromise<void>;
}
