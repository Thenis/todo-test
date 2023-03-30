import { CreateCategoryCriteria } from "../criteria/create-category.criteria";
import { CategoryModel } from "../models/category.model";
import { ICreatable, IReadableAll } from "./crud.interface";

export interface ICategoryRepository
  extends ICreatable<CreateCategoryCriteria>,
    IReadableAll<CategoryModel> {}
