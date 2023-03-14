import { TodoModel } from "../models/todo.model";
import { IReadable } from "./crud.interface";

export interface ITodoRepository extends IReadable<TodoModel[]> {}
