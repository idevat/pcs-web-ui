import {NotificationBadge as PfNotificationBadge} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

import type {Notification} from "./types";

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
      onClick={switchDrawer}
      aria-label="Notifications"
      className="ha-c-notification-badge"
      {...testMarks.notifications.badge.mark}
    >
      {unreadErrorCount > 0
        ? `Notifications ${unreadErrorCount}`
        : "Notifications"}
    </PfNotificationBadge>
  );
};
