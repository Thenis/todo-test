import firebase from "firebase/compat";
import { CategoryModel } from "../models/category.model";

export const categoryConverter = {
  toFirestore(category: CategoryModel): firebase.firestore.DocumentData {
    return { title: category.title };
  },
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot,
    options: firebase.firestore.SnapshotOptions
  ): CategoryModel {
    const data = snapshot.data(options);
    return { title: data.title };
  },
};
