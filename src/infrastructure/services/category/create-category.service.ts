import { CreateCategoryCriteria } from "src/infrastructure/criteria/create-category.criteria";
import type { ICategoryRepository } from "src/infrastructure/interfaces/category-repository.interface";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";
import { inject, singleton } from "tsyringe";

export interface ICreateCategoryService {
  create(title: string): Promise<void>;
}

@singleton()
export class CreateCategoryService implements ICreateCategoryService {
  constructor(
    @inject(SERVICE_KEYS.CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository
  ) {}

  async create(title: string): Promise<void> {
    const criteria = new CreateCategoryCriteria();

    criteria.title = title;

    await this.categoryRepository.create(criteria);
  }
}
