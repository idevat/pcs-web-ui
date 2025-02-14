import {combineReducers} from "redux";

import type {AppReducer} from "app/store/reducers/appReducer";

import {clusterStatus} from "./clusterStatus";
import {pcmkAgents} from "./pcmkAgents";
import {clusterProperties} from "./properties";
import {clusterPermissions} from "./permissions";
import {resourceAgentMap} from "./resourceAgentMap";
import {fenceAgentList} from "./fenceAgentList";

const clusterStorageItem = combineReducers({
  clusterStatus,
  pcmkAgents,
  clusterProperties,
  clusterPermissions,
  resourceAgentMap,
  fenceAgentList,
});

type ClusterStorage = Record<string, ReturnType<typeof clusterStorageItem>>;

export const clusterStorage: AppReducer<ClusterStorage> = (
  state = {},
  action,
) => {
  if (
    action.type === "AUTH.REQUIRED" ||
    action.type === "USER.PERMISSIONS_LOST"
  ) {
    return {};
  }
  if ("key" in action && "clusterName" in action.key) {
    if (action.key.clusterName === null) {
      // The action is not for cluster at all when cluster name is explicitly
      // null.
      // It is currently used for dashboard tasks: some mechanisms are shared
      // among cluster tasks and dashboard tasks via action types, however,
      // every particular action is only for 1) particular task of a particular
      // cluster or 2) particular task of dashboard. It is not possible to
      // depend only on task key because there is not enforced unique task name.
      return state;
    }
    return {
      ...state,
      [action.key.clusterName]: clusterStorageItem(
        state[action.key.clusterName],
        action,
      ),
    };
  }
  return Object.keys(state).reduce<ClusterStorage>(
    (newState, clusterName) => ({
      ...newState,
      [clusterName]: clusterStorageItem(state[clusterName], action),
    }),
    {} as ClusterStorage,
  );
};
