import { singleton } from "tsyringe";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { IAuthService } from "../../interfaces/auth-service.interface";
import { UserModel } from "../../models/user.model";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

@singleton()
export class AuthService implements IAuthService {
  firebaseInstance: firebase.app.App;
  auth: firebase.auth.Auth;
  provider: firebase.auth.GoogleAuthProvider;

  constructor() {
    this.firebaseInstance = firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
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
