import { ClusterStatusService } from "./cluster";
import { AgentsStorage } from "./pcmkAgents";
import { ResourceTreeState } from "./resourceTree";
import { ClusterPropertiesService } from "./clusterProperties";
import { ResourceAgentListService } from "./resourceAgentList";

export type Item = {
  clusterStatus: ClusterStatusService;
  pcmkAgents: AgentsStorage;
  resourceTree: ResourceTreeState;
  clusterProperties: ClusterPropertiesService;
  resourceAgentMap: ResourceAgentListService;
};

export type Map = Record<string, Item>;