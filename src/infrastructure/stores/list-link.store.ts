import { computed, flow, makeObservable, observable } from "mobx";
import { inject, singleton } from "tsyringe";
import { CreateLinkCriteria } from "../criteria/create-link.criteria";
import type { ILinkRepository } from "../interfaces/link-repository.interface";
import { LinkModel } from "../models/link.model";
import { SERVICE_KEYS } from "../service-keys";
import { LinkViewModel } from "../viewmodels/link.viewmodel";

export interface IListLinkStore {
  loaded: boolean;
  loading: boolean;
  viewModel: LinkViewModel[];
  get links(): LinkViewModel[];
  getAll(categoryId: string): Promise<void>;
  create(categoryId: string, link: string): Promise<void>;
}

@singleton()
export class ListLinkStore implements IListLinkStore {
  @observable
  loaded = false;

  @observable
  loading = false;

  @observable
  viewModel: LinkViewModel[] = [];

  constructor(
    @inject(SERVICE_KEYS.LINK_REPOSITORY)
    private linkRepository: ILinkRepository
  ) {
    makeObservable(this);
  }

  @computed
  get links(): LinkViewModel[] {
    return this.viewModel;
  }

  getAll = flow(function* (this: ListLinkStore, categoryId: string) {
    this.loading = true;

    try {
      const result: LinkModel[] = yield this.linkRepository.getAll(categoryId);
      this.viewModel = result.map((model) => {
        const viewModel = new LinkViewModel();
        viewModel.update(model);

        return viewModel;
      });
      this.loaded = true;
    } finally {
      this.loading = false;
    }
  });

  create = flow(function* (
    this: ListLinkStore,
    categoryId: string,
    link: string
  ) {
    const criteria = new CreateLinkCriteria();

    criteria.categoryId = categoryId;
    criteria.link = link;

    yield this.linkRepository.create(criteria);
    yield this.getAll(categoryId);
  });
}
