import {
  collection,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  QuerySnapshot,
  setDoc,
  where,
} from "firebase/firestore";
import { AppTrackEvent } from "src/shared/decorators/track-event.decorator";
import { TrackRequest } from "src/shared/decorators/track-request.decorator";
import { inject, singleton } from "tsyringe";
import { linkConverter } from "../converters/link.converter";
import { CreateLinkCriteria } from "../criteria/create-link.criteria";
import { ILinkRepository } from "../interfaces/link-repository.interface";
import { LinkModel } from "../models/link.model";
import { SERVICE_KEYS } from "../service-keys";

@singleton()
export class LinkRepository implements ILinkRepository {
  constructor(
    @inject(SERVICE_KEYS.FIREBASE_DB) private readonly db: Firestore
  ) {}

  @TrackRequest()
  async create(criteria: CreateLinkCriteria): Promise<void> {
    const ref = doc(collection(this.db, "links")).withConverter(
      linkConverter as any
    ) as DocumentReference<LinkModel>;

    await setDoc(ref, criteria);
  }

  @TrackRequest()
  @AppTrackEvent({ name: "get-all-links" })
  async getAll(categoryId: string): Promise<LinkModel[]> {
    const linksQuery = query(
      collection(this.db, "links"),
      where("categoryId", "==", categoryId)
    ).withConverter(linkConverter as any);

    const querySnapshot = (await getDocs(
      linksQuery
    )) as QuerySnapshot<LinkModel>;

    return querySnapshot.docs.map((doc) => doc.data());
  }
}
