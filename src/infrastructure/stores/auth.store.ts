import { computed, flow, makeObservable, observable } from "mobx";
import { inject, singleton } from "tsyringe";
import type { IAuthService } from "../interfaces/auth-service.interface";
import { UserModel } from "../models/user.model";
import { SERVICE_KEYS } from "../service-keys";

export interface IAuthStore {
  user: UserModel | null;
  getUser(): Promise<void>;
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

    this.authService.registerAuthListener((user) => {
      this.user = user;
    });
  }

  @computed
  get isAuth() {
    return !!this.user;
  }

  getUser = flow(function* (this: AuthStore) {
    const user = yield this.authService.getUser();
    this.user = user;
  });

  login = flow(function* (this: AuthStore) {
    const user = yield this.authService.login();

    console.log("User logged in: ", user);
  });

  logout = flow(function* (this: AuthStore) {
    yield this.authService.logout();
  });
}
