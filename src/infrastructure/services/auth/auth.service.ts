import { inject, singleton } from "tsyringe";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { IAuthService } from "../../interfaces/auth-service.interface";
import { UserModel } from "../../models/user.model";
import { SERVICE_KEYS } from "src/infrastructure/service-keys";

@singleton()
export class AuthService implements IAuthService {
  firebaseInstance: firebase.app.App;
  provider: firebase.auth.GoogleAuthProvider;

  constructor(
    @inject(SERVICE_KEYS.FIREBASE_AUTH)
    private readonly auth: firebase.auth.Auth
  ) {
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.provider.setCustomParameters({ prompt: "select_account" });
  }

  registerAuthListener(callback: (user: UserModel | null) => void): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        const model = new UserModel();

        model.displayName = user.displayName as string;
        model.accessToken = (user as any).accessToken as string;
        model.email = user.email as string;

        console.log("User logged in: ", user);

        callback(model);
      } else {
        console.log("User logged out");

        callback(null);
      }
    });
  }

  getUser(): Promise<UserModel | null> {
    return new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          const model = new UserModel();

          model.displayName = user.displayName as string;
          model.accessToken = (user as any).accessToken as string;
          model.email = user.email as string;

          console.log("User logged in: ", user);

          resolve(model);
        } else {
          console.log("User logged out");

          resolve(null);
        }
      });
    });
  }

  async login(): Promise<void> {
    await this.auth.signInWithPopup(this.provider);
  }

  async logout(): Promise<void> {
    return await this.auth.signOut();
  }
}
