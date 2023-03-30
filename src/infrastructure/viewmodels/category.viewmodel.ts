import { action, makeObservable, observable } from "mobx";
import { IViewModel } from "../interfaces/view-model.interface";
import { CategoryModel } from "../models/category.model";

export class CategoryViewModel implements IViewModel<CategoryModel> {
  @observable
  title: string;

  @observable
  links: string[];

  constructor() {
    makeObservable(this);
  }

  @action
  update(model: CategoryModel): void {
    this.title = model.title;
    this.links = model.links;
  }
}
