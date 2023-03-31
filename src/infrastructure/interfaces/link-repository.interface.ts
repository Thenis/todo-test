import { LinkModel } from "../models/link.model";

export interface ILinkRepository {
  getAll(categoryId: string): Promise<LinkModel[]>;
}
