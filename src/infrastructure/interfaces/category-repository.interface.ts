import { CreateCategoryCriteria } from "../criteria/create-category.criteria";
import { ICreatable } from "./crud.interface";

export interface ICategoryRepository
  extends ICreatable<CreateCategoryCriteria> {}
