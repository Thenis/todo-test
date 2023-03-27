import { TrackRequest } from "src/shared/decorators/track-request.decorator";
import { singleton } from "tsyringe";
import { ITodoRepository } from "../interfaces/todo-repository.interface";
import { TodoModel } from "../models/todo.model";

@singleton()
export class TodoRepository implements ITodoRepository {
  @TrackRequest()
  get(): Promise<TodoModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          content: "Some content",
          completed: false,
        });
      }, 1500);
    });
  }
}
