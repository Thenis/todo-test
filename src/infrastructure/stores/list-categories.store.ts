import { computed, flow, observable, toJS } from "mobx";
import { inject, singleton } from "tsyringe";
import type { ICategoryRepository } from "../interfaces/category-repository.interface";
import { CategoryModel } from "../models/category.model";
import { SERVICE_KEYS } from "../service-keys";
import { CategoryViewModel } from "../viewmodels/category.viewmodel";

export interface IListCategoriesStore {
  loading: boolean;
  loaded: boolean;
  get categories(): CategoryViewModel[];
  getAll(): Promise<void>;
}

@singleton()
export class ListCategoriesStore implements IListCategoriesStore {
  @observable
  viewModel: CategoryViewModel[] = [];

  @observable
  loading = false;

  @observable
  loaded = false;

  constructor(
    @inject(SERVICE_KEYS.CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository
  ) {}

  @computed
  get categories(): CategoryViewModel[] {
    return toJS(this.viewModel);
  }

  getAll = flow(function* (this: ListCategoriesStore) {
    this.loading = true;

    try {
      const categories: CategoryModel[] =
        yield this.categoryRepository.getAll();

      this.loaded = true;

      this.viewModel = categories.map((category) => {
        const viewModel = new CategoryViewModel();

        viewModel.update(category);

        return viewModel;
      });
    } finally {
      this.loading = false;
    }
  });
}
