import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { TrackRequest } from "src/shared/decorators/track-request.decorator";
import { inject, singleton } from "tsyringe";
import { linkConverter } from "../converters/link.converter";
import { ILinkRepository } from "../interfaces/link-repository.interface";
import { LinkModel } from "../models/link.model";
import { SERVICE_KEYS } from "../service-keys";

@singleton()
export class LinkRepository implements ILinkRepository {
  constructor(
    @inject(SERVICE_KEYS.FIREBASE_DB) private readonly db: Firestore
  ) {}

  @TrackRequest()
  async getAll(categoryId: string): Promise<LinkModel[]> {
    const categoryRef = doc(this.db, "categories", categoryId);

    const responseDoc = await getDoc(categoryRef);

    if (responseDoc.exists()) {
      const linkIds = responseDoc.data()?.linkIds;

      const linksQuery = query(
        collection(this.db, "links"),
        where("__name__", "in", linkIds)
      ).withConverter(linkConverter as any);

      const querySnapshot = (await getDocs(
        linksQuery
      )) as QuerySnapshot<LinkModel>;

      return querySnapshot.docs.map((doc) => doc.data());
    }

    return [];
  }
}
