import { action, computed, makeObservable, observable, toJS } from "mobx";
import { singleton } from "tsyringe";

export interface IPendingRequestStore {
  get pendingRequestList(): string[];
  addRequest(key: string): void;
  removeRequest(key: string): void;
}

@singleton()
export class PendingRequestStore implements IPendingRequestStore {
  requests: string[] = [];

  constructor() {
    makeObservable(this, {
      requests: observable,
      pendingRequestList: computed,
      addRequest: action,
      removeRequest: action,
    });
  }

  get pendingRequestList(): string[] {
    return toJS(this.requests);
  }

  addRequest(key: string) {
    this.requests = [...this.requests, key];
  }

  removeRequest(key: string) {
    this.requests = this.requests.filter((r) => r !== key);
  }
}
