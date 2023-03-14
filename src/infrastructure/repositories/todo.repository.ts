import { singleton } from "tsyringe";
import { ITodoRepository } from "../interfaces/todo-repository.interface";
import { TodoModel } from "../models/todo.model";

@singleton()
export class TodoRepository implements ITodoRepository {
  get(): Promise<TodoModel[]> {
    return Promise.resolve([
      {
        content: "Some content",
        completed: false,
      },
    ]);
  }
}
