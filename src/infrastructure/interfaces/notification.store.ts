import { action, makeObservable, observable } from "mobx";
import { v4 as uuid } from "uuid";
import { singleton } from "tsyringe";

export interface Notification {
  message: string;
  options: {
    variant: "info" | "error" | "success";
  };
}

export type NotificationList = Notification & { key: string };

export interface INotificationStore {
  notifications: NotificationList[];
  enqueueSnackbar(note: Notification): void;
  removeSnackbar(key: string): void;
}

@singleton()
export class NotificationStore implements INotificationStore {
  @observable
  notifications: NotificationList[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  enqueueSnackbar(note: Notification) {
    this.notifications.push({
      key: uuid(),
      ...note,
    });
  }

  @action
  removeSnackbar(key: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.key !== key
    );
  }
}
