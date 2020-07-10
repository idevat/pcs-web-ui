// prettier-ignore
import {
  AddClusterActions as TAddClusterActions,
} from "./dashboard-add-cluster";
import { AuthActions as TAuthActions } from "./auth";
import { ClusterActions as TClusterActions } from "./cluster";
import { DashboardActions } from "./dashboard";
import { LoginActions as TLoginActions } from "./login";
import { NotificationActions as TNotificationActions } from "./notifications";
// prettier-ignore
import {
  ResourceDetailActions as TResourceDetailActions,
} from "./resource-detail";
import { ResourceTreeActions } from "./resource-tree";
import { UsernameActions } from "./username";
// prettier-ignore
import {
  PrimitiveResourceActions as TPrimitiveResourceActions,
} from "./resource-primitive";

import { ResourceAgentActions as TResourceAgentActions } from "./resource-agent";

import { FenceAgentActions as TFenceAgentActions } from "./fence-agent";

import { ClusterPropertiesActions as TClusterPropertiesActions } from "./clusterProperties";

export type AddClusterActions = TAddClusterActions;
export type AuthActions = TAuthActions;
export type ClusterActions = TClusterActions;
export type LoginActions = TLoginActions;
export type NotificationActions = TNotificationActions;
export type ResourceDetailActions = TResourceDetailActions;
export type PrimitiveResourceActions = TPrimitiveResourceActions;
export type ResourceAgentActions = TResourceAgentActions;
export type FenceAgentActions = TFenceAgentActions;
export type ClusterPropertiesActions = TClusterPropertiesActions;

type Union<A> = A[keyof A];

// prettier-ignore
export type LeafAction = (
  | Union<TAddClusterActions>
  | Union<TAuthActions>
  | Union<TClusterActions>
  | Union<DashboardActions>
  | Union<TLoginActions>
  | Union<TNotificationActions>
  | Union<TResourceDetailActions>
  | Union<ResourceTreeActions>
  | Union<UsernameActions>
  | Union<TPrimitiveResourceActions>
  | Union<TResourceAgentActions>
  | Union<TFenceAgentActions>
  | Union<TClusterPropertiesActions>
);

export type SetupDataReading = {
  type: "DATA_READING.SET_UP";
  payload: {
    specificator: string;
    start: LeafAction;
    stop: LeafAction;
  }[];
};

export type Action = LeafAction | SetupDataReading;

export const actionType = (value: Action["type"]): Action["type"] => value;
