import * as types from "app/store/state/types";

import { Selector } from "./selector";

type NotificationState = types.notifications.NotificationState;
export const getNotifications: Selector<NotificationState> = state =>
  state.notifications;
