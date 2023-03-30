import firebase from "firebase/compat";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { CreateCategoryCriteria } from "../criteria/create-category.criteria";
import { CategoryModel } from "../models/category.model";

export const categoryConverter = {
  toFirestore(category: CreateCategoryCriteria): DocumentData {
    return { title: category.title };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): CategoryModel {
    const data = snapshot.data(options);
    const model = new CategoryModel();
    model.title = data.title;

    return model;
  },
};
