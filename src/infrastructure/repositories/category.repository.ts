import { TrackRequest } from "src/shared/decorators/track-request.decorator";
import { inject, singleton } from "tsyringe";
import { collection, doc, Firestore, setDoc } from "firebase/firestore";

import { CreateCategoryCriteria } from "../criteria/create-category.criteria";
import { ICategoryRepository } from "../interfaces/category-repository.interface";
import { SERVICE_KEYS } from "../service-keys";
import { categoryConverter } from "../converters/category.converter";

@singleton()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @inject(SERVICE_KEYS.FIREBASE_DB) private readonly db: Firestore
  ) {}

  @TrackRequest()
  async create(category: CreateCategoryCriteria): Promise<void> {
    const ref = doc(collection(this.db, "categories")).withConverter(
      categoryConverter
    );

    await setDoc(ref, category);
  }
}
