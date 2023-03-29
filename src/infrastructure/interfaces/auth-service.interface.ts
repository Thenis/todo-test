import { UserModel } from "../models/user.model";

export interface IAuthService {
  login(): Promise<UserModel>;
  logout(): Promise<void>;
}
