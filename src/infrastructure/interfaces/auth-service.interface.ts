import { UserModel } from "../models/user.model";

export interface IAuthService {
  login(): Promise<void>;
  logout(): Promise<void>;
  getUser(): Promise<UserModel | null>;
  registerAuthListener(callback: (user: UserModel | null) => void): void;
}
