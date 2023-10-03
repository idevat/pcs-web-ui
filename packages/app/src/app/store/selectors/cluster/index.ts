import {ClusterStorageItem, ClusterTaskKeys, Root} from "../types";

import {
  ClusterSelector as TClusterSelector,
  clusterStorageItemSelector,
} from "./selectorsHelpers";

export const getClusterTask = <NAME extends ClusterTaskKeys>(name: NAME) =>
  clusterStorageItemSelector(
    clusterStorageItem => clusterStorageItem.tasks[name],
  );

export const getCurrentClusterTaskKey = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.currentTaskKey,
);

export const getPcmkAgent = clusterStorageItemSelector(
  (clusterStorageItem, agentName: string) =>
    clusterStorageItem.pcmkAgents[agentName],
);

export const getClusterProperties = clusterStorageItemSelector(
  clusterStorageItem => clusterStorageItem.clusterProperties.data,
);

export type ClusterSelector<
  ARGS extends unknown[],
  SELECTED,
> = TClusterSelector<ARGS, SELECTED>;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ExtractClusterSelector<SELECTOR> = SELECTOR extends ClusterSelector<
  any[],
  infer SELECTED
>
  ? SELECTED
  : never;

type ClusterInfo =
  | {
      isRegistered: false;
      clusterStatus: {
        isForbidden: false;
        data: null;
      };
      permissions: null;
      resourceAgentMap: null;
      fenceAgentList: null;
      pcmkAgents: null;
      tasks: null;
      uiState: null;
    }
  | {
      isRegistered: true;
      clusterStatus: {
        isForbidden: boolean;
        data: ClusterStorageItem["clusterStatus"]["clusterData"];
        load: {when: number; currently: boolean};
      };
      permissions: ClusterStorageItem["clusterPermissions"]["data"];
      resourceAgentMap: ClusterStorageItem["resourceAgentMap"]["data"];
      fenceAgentList: ClusterStorageItem["fenceAgentList"]["data"];
      pcmkAgents: ClusterStorageItem["pcmkAgents"];
      tasks: {[K in ClusterTaskKeys]: ClusterStorageItem["tasks"][K]};
      uiState: {
        resourceOpenedItems: ClusterStorageItem["resourceTree"];
      };
    };

export const getClusterStoreInfo =
  (clusterName: string) =>
  (state: Root): ClusterInfo => {
    const clusterStoreItem = state.clusterStorage[clusterName];
    if (clusterStoreItem === undefined) {
      // A very short init period before first cluster request action is run.
      return {
        isRegistered: false,
        clusterStatus: {
          isForbidden: false,
          data: null,
        },
        permissions: null,
        resourceAgentMap: null,
        fenceAgentList: null,
        pcmkAgents: null,
        tasks: null,
        uiState: null,
      };
    }

    const {
      clusterData: data,
      load: {when, currently, result},
    } = clusterStoreItem.clusterStatus;
    return {
      isRegistered: true,
      clusterStatus: {
        isForbidden: result === "FORBIDDEN",
        data,
        load: {when, currently},
      },
      permissions: clusterStoreItem.clusterPermissions.data,
      resourceAgentMap: clusterStoreItem.resourceAgentMap.data,
      fenceAgentList: clusterStoreItem.fenceAgentList.data,
      pcmkAgents: clusterStoreItem.pcmkAgents,
      tasks: clusterStoreItem.tasks,
      uiState: {
        resourceOpenedItems: clusterStoreItem.resourceTree,
      },
    };
  };