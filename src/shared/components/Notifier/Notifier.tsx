import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNotification } from "src/context/notification.context";

const Notifier = observer(() => {
  const { notificationStore } = useNotification();
  const { enqueueSnackbar } = useSnackbar();

  const [displayed, setDisplayed] = useState<string[]>([]);

  useEffect(() => {
    const dispose = autorun(() => {
      notificationStore.notifications.forEach((notification) => {
        // Do nothing if snackbar is already displayed
        if (displayed.includes(notification.key)) return;
        // Display snackbar using notistack
        enqueueSnackbar(notification.message, notification.options);
        // Keep track of snackbars that we've displayed
        setDisplayed((currDisplayed) => [...currDisplayed, notification.key]);
        // Dispatch action to remove snackbar from mobx store
        notificationStore.removeSnackbar(notification.key);
      });
    });

    return () => dispose();
  }, [notificationStore]);

  return <></>;
});

export default Notifier;
