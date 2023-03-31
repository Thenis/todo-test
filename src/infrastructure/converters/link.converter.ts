import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { CreateLinkCriteria } from "../criteria/create-link.criteria";
import { LinkModel } from "../models/link.model";

export const linkConverter = {
  toFirestore(payload: CreateLinkCriteria): DocumentData {
    return { link: payload.link, categoryId: payload.categoryId };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): LinkModel {
    const data = snapshot.data(options);
    const model = new LinkModel();

    model.categoryId = data.categoryId;
    model.link = data.link;
    model.id = snapshot.id;

    return model;
  },
};
