import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { CreateCategoryCriteria } from "../criteria/create-category.criteria";
import { LinkModel } from "../models/link.model";

export const linkConverter = {
  toFirestore(category: CreateCategoryCriteria): DocumentData {
    return { title: category.title, linkIds: category.linkIds };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): LinkModel {
    const data = snapshot.data(options);
    const model = new LinkModel();

    model.categoryId = data.categoryId;
    model.url = data.url;
    model.id = snapshot.id;

    return model;
  },
};
