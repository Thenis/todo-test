import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { CreateCategoryCriteria } from "../criteria/create-category.criteria";
import { CategoryModel } from "../models/category.model";

export const categoryConverter = {
  toFirestore(category: CreateCategoryCriteria): DocumentData {
    return { title: category.title, linkIds: category.linkIds };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): CategoryModel {
    const data = snapshot.data(options);
    const model = new CategoryModel();
    model.title = data.title;
    model.linkIds = data.linkIds;
    model.id = snapshot.id;

    return model;
  },
};
