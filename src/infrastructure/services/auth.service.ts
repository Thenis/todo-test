import { singleton } from "tsyringe";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { IAuthService } from "../interfaces/auth-service.interface";
import { UserModel } from "../models/user.model";

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
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.provider.setCustomParameters({ prompt: "select_account" });
  }

  async login(): Promise<UserModel> {
    const response = await this.auth.signInWithPopup(this.provider);
    const model = new UserModel();

    model.displayName = response.user?.displayName as string;
    model.accessToken = (response.credential as any).accessToken as string;
    model.email = response.user?.email as string;

    return model;
  }

  async logout(): Promise<void> {
    return this.auth.signOut();
  }
}
