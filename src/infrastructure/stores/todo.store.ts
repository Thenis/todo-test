import { flow, makeObservable, observable } from "mobx";
import { inject, singleton } from "tsyringe";
import type { ITodoRepository } from "../interfaces/todo-repository.interface";
import { ITodoStore } from "../interfaces/todo-store.interface";
import { TodoModel } from "../models/todo.model";
import { SERVICE_KEYS } from "../service-keys";
import { TodoViewModel } from "../viewmodels/todo.viewmodel";

@singleton()
export class TodoStore implements ITodoStore {
  viewModel: TodoViewModel[] = [];

  constructor(
    @inject(SERVICE_KEYS.TODO_REPOSITORY)
    private todoRepository: ITodoRepository
  ) {
    makeObservable(this, {
      viewModel: observable,
      fetch: flow,
    });
  }

  fetch = flow(function* (this: TodoStore) {
    const model: TodoModel[] = yield this.todoRepository.get();

    this.viewModel = model.map(
      (m) => new TodoViewModel(m.content, m.completed)
    );
  });
}
