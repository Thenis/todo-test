import { makeAutoObservable } from "mobx";

export class TodoViewModel {
  constructor(public content: string, public completed: boolean) {
    makeAutoObservable(this);
  }

  complete() {
    this.completed = true;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
