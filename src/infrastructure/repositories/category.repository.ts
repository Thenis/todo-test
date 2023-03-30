import { TrackRequest } from "src/shared/decorators/track-request.decorator";
import { singleton } from "tsyringe";
import { CreateCategoryCriteria } from "../criteria/create-category.criteria";
import { ICategoryRepository } from "../interfaces/category-repository.interface";

@singleton()
export class CategoryRepository implements ICategoryRepository {
  @TrackRequest()
  async create(category: CreateCategoryCriteria): Promise<void> {}
}
