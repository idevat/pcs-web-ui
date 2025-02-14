import type {AuthActions} from "./auth";
import type {ClusterActions} from "./cluster";
import type {ConstraintAction} from "./constraint";
import type {DashboardActions} from "./dashboard";
import type {FenceAgentActions} from "./fenceAgent";
import type {LibActions} from "./lib";
import type {LoginActions} from "./login";
import type {NodeActions} from "./node";
import type {NotificationActions} from "./notifications";
import type {ResourceActions} from "./resource";
import type {FenceDeviceActions} from "./fenceDevice";
import type {ResourceAgentActions} from "./resourceAgent";
import type {UsernameActions} from "./username";
import type {UserActions} from "./user";
import type {TaskActions} from "./task";

// biome-ignore format:
type LeafActionMap = (
  & AuthActions
  & ClusterActions
  & ConstraintAction
  & DashboardActions
  & FenceAgentActions
  & LibActions
  & LoginActions
  & NodeActions
  & NotificationActions
  & FenceDeviceActions
  & ResourceActions
  & ResourceAgentActions
  & TaskActions
  & UsernameActions
  & UserActions
);

export type ActionLeaf = LeafActionMap[keyof LeafActionMap];

type SetupDataReading = {
  type: "DATA_READING.SET_UP";
  payload: {
    behavior: "replace" | "add";
    readings: {
      id: string;
      start: ActionLeaf;
      stop: ActionLeaf;
    }[];
  };
};

export type ActionMap = LeafActionMap & {
  "DATA_READING.SET_UP": SetupDataReading;
};

export type ActionPayload = {
  -readonly [K in keyof ActionMap]: ActionMap[K] extends {payload: unknown}
    ? ActionMap[K]["payload"]
    : undefined;
};

export type ActionKey = {
  -readonly [K in keyof ActionMap]: ActionMap[K] extends {key: unknown}
    ? ActionMap[K]["key"]
    : undefined;
};

export type Action = ActionLeaf | SetupDataReading;

let nextId = 1;
export const actionNewId = () => {
  return nextId++;
};

// 1. Actions are one big map in format:
//
// export type SomeActions = {
//   "ACTION.FIRST": {
//     typel: "ACTION.FIRST",
//     payload: { some: string };
//   };
//   "ACTION.SECOND": {
//     typel: "ACTION.SECOND",
//     payload: { some: string };
//   };
// }
//
// It is because in this format, it is possible to get union of actions by:
// type Action = SomeActions[keyouf SomeActions]
//
// The key of action is the same as type of action. This convention allows
// easily reference Action and ActionMap
//
// -----------------------------------------------------------------------
//
// 2. I haven't found out how to get this from module, e.g.:
//
// // some-module.ts
// export type first: {
//   typel: "ACTION.FIRST",
//   payload: { some: string };
// };
// export type second: {
//   typel: "ACTION.SECOND",
//   payload: { some: string };
// };
//
// // another-module.ts
// import * as SomeActions from "./some-module";
// // I couldn't get the necessary types from here
//
// -----------------------------------------------------------------------
//
// 3. It would be possible to use following type
// export type ActionMapFrom<ACTIONS> = {
//   [K in keyof ACTIONS]: ACTIONS[K] extends null
//     ? { type: K }
//     : { type: K; payload: ACTIONS[K] };
// };
//
// to get desired types from something like this
// export type SomeActions = {
//   "ACTION.FIRST": { some: string };
//   "ACTION.SECOND": { some: string };
// };
//
// But in this case does not worked code navigation (I'm not able to find
// usages), I'm not able to jump to action from the the usage. So, the current
// situation is not optimal but it is kind of tradeoff.
