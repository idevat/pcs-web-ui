import type React from "react";
import {Level, LevelItem, StackItem} from "@patternfly/react-core";

import {Badge, type types} from "../notification";

export const PageToolbar = ({
  toolbarInfo,
  notifications,
}: {
  toolbarInfo: React.ReactNode;
  notifications: {
    list: types.Notification[];
    isDrawerOpen: boolean;
    setDrawerOpen: (_isDrawerOpen: boolean) => void;
  };
}) => {
  return (
    <StackItem>
      <Level>
        <LevelItem>{toolbarInfo}</LevelItem>

        <LevelItem>
          <Badge
            notificationList={notifications.list}
            switchDrawer={() =>
              notifications.setDrawerOpen(!notifications.isDrawerOpen)
            }
          />
        </LevelItem>
      </Level>
    </StackItem>
  );
};
