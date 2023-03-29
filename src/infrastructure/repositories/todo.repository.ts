import { TrackRequest } from "src/shared/decorators/track-request.decorator";
import { singleton } from "tsyringe";
import { ITodoRepository } from "../interfaces/todo-repository.interface";
import { TodoModel } from "../models/todo.model";

const fakeHttpCall = (url: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        content: "Some content",
        completed: false,
      });
    }, 1500);
  });
};

@singleton()
export class TodoRepository implements ITodoRepository {
  @TrackRequest()
  async get(): Promise<TodoModel> {
    return (await fakeHttpCall("my-url")) as Promise<TodoModel>;
  }
}
