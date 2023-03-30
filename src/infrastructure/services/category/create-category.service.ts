import type { ICategoryRepository } from "src/infrastructure/interfaces/category-repository.interface";
import { singleton } from "tsyringe";

export interface ICreateCategoryService {
  create(title: string): Promise<void>;
}

@singleton()
export class CreateCategoryService implements ICreateCategoryService {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async create(title: string): Promise<void> {}
}
