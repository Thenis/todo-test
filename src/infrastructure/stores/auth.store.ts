import { computed, flow, makeObservable, observable } from "mobx";
import { inject, singleton } from "tsyringe";
import type { IAuthService } from "../interfaces/auth-service.interface";
import { UserModel } from "../models/user.model";
import { SERVICE_KEYS } from "../service-keys";

export interface IAuthStore {
  user: UserModel | null;
  get isAuth(): boolean;
  login(): Promise<void>;
  logout(): Promise<void>;
}

@singleton()
export class AuthStore implements IAuthStore {
  @observable
  user: UserModel | null = null;

  constructor(
    @inject(SERVICE_KEYS.AUTH_SERVICE) private authService: IAuthService
  ) {
    makeObservable(this);
  }

  @computed
  get isAuth() {
    return !!this.user;
  }

  login = flow(function* (this: AuthStore) {
    const user = yield this.authService.login();

    this.user = user;

    console.log("User logged in: ", user);
  });

  logout = flow(function* (this: AuthStore) {
    yield this.authService.logout();
  });
}
