import { CreateLinkCriteria } from "../criteria/create-link.criteria";
import { LinkModel } from "../models/link.model";
import { ICreatable } from "./crud.interface";

export interface ILinkRepository extends ICreatable<CreateLinkCriteria> {
  getAll(categoryId: string): Promise<LinkModel[]>;
}
