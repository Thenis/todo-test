import { action, makeObservable, observable } from "mobx";
import { IViewModel } from "../interfaces/view-model.interface";
import { CategoryModel } from "../models/category.model";

export class CategoryViewModel implements IViewModel<CategoryModel> {
  @observable
  id: string;

  @observable
  title: string;

  constructor() {
    makeObservable(this);
  }

  @action
  update(model: CategoryModel): void {
    this.id = model.id;
    this.title = model.title;
  }
}
