import { TodoModel } from "../models/todo.model";

export class TodoRepository {
  get(): Promise<TodoModel[]> {
    return Promise.resolve([
      {
        content: "Some content",
        completed: false,
      },
    ]);
  }
}

export const todoRepository = new TodoRepository();
