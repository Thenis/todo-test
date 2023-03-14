import { makeAutoObservable } from "mobx";
import { todoRepository } from "../repositories/todo.repository";
import { TodoViewModel } from "../viewmodels/todo.viewmodel";

export class TodoStore {
  viewModel: TodoViewModel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetch() {
    const model = await todoRepository.get();

    this.viewModel = model.map(
      (m) => new TodoViewModel(m.content, m.completed)
    );
  }
}
