import { action, makeObservable, observable } from "mobx";
import { IViewModel } from "../interfaces/view-model.interface";
import { LinkModel } from "../models/link.model";

export class LinkViewModel implements IViewModel<LinkModel> {
  @observable
  id: string;

  @observable
  url: string;

  @observable
  categoryId: string;

  constructor() {
    makeObservable(this);
  }

  @action
  update(model: LinkModel): void {
    this.id = model.id;
    this.url = model.url;
    this.categoryId = model.categoryId;
  }
}
