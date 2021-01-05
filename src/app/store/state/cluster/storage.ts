import { Reducer, combineReducers } from "app/store/redux";

import clusterStatus, { types as clusterStatusTypes } from "./clusterStatus";
import pcmkAgents, { AgentsStorage } from "./pcmkAgents";
import resourceTree, { ResourceTreeState } from "./resourceTree";
import clusterProperties, { ClusterPropertiesService } from "./properties";
import resourceAgentMap, { ResourceAgentListService } from "./resourceAgentMap";
import wizardResourceCreate, {
  WizardResourceCreate,
} from "./wizardResourceCreate";
import wizardNodeAdd, { WizardNodeAdd } from "./wizardNodeAdd";
import fixAuth, { FixAuth } from "./fixAuth";

export type ClusterStorageItem = {
  clusterStatus: clusterStatusTypes.ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
  clusterProperties: ClusterPropertiesService;
  resourceAgentMap: ResourceAgentListService;
  wizardResourceCreate: WizardResourceCreate;
  wizardNodeAdd: WizardNodeAdd;
  fixAuth: FixAuth;
};

export type ClusterStorageMap = Record<string, ClusterStorageItem>;

const clusterStorageItem = combineReducers<ClusterStorageItem>({
  clusterStatus,
  pcmkAgents,
  resourceTree,
  clusterProperties,
  resourceAgentMap,
  wizardResourceCreate,
  wizardNodeAdd,
  fixAuth,
});

const clusterStorage: Reducer<ClusterStorageMap> = (state = {}, action) => {
  if (action.type === "AUTH.REQUIRED") {
    return {};
  }
  if (
    "key" in action
    && "clusterName" in action.key
    && action.key.clusterName in state
  ) {
    return {
      ...state,
      [action.key.clusterName]: clusterStorageItem(
        state[action.key.clusterName],
        action,
      ),
    };
  }

  return state;
};

export default clusterStorage;
