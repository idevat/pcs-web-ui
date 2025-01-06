import {NotificationBadge as PfNotificationBadge} from "@patternfly/react-core";
import BellIcon from "@patternfly/react-icons/dist/esm/icons/bell-icon";

import {testMarks} from "app/view/dataTest";

import {Notification} from "./types";

export const Badge = ({
  notificationList,
  switchDrawer,
}: {
  notificationList: Notification[];
  switchDrawer: () => void;
}) => {
  const unreadErrorCount = notificationList.filter(
    n => !n.isRead && n.severity === "ERROR",
  ).length;

  return (
    <PfNotificationBadge
      variant={
        notificationList.some(n => !n.isRead)
          ? unreadErrorCount > 0
            ? "attention"
            : "unread"
          : "read"
      }
      count={unreadErrorCount}
      onClick={switchDrawer}
      aria-label="Notifications"
      {...testMarks.notifications.badge.mark}
    >
     <BellIcon /> Notifications
    </PfNotificationBadge>
  );
};
