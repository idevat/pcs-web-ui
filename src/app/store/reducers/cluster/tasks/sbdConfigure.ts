import { ActionPayload } from "app/store/actions";
import { AppReducer } from "app/store/reducers/appReducer";
import { getClusterSbdConfig } from "app/store/reducers/cluster/clusterStatus/extract";

import { initialState as initalLibCall, libCall } from "./libCall";

type NodeName = string;
type Cluster = ActionPayload["CLUSTER.SBD.CONFIGURE"]["cluster"];

const initialState: {
  watchdogDict: Record<NodeName, string>;
  delayStart: "yes" | "no" | "DEFAULT";
  startmode: "always" | "clean" | "DEFAULT";
  watchdogTimeout: string;
  timeoutActionFlush: "DEFAULT" | "flush" | "noflush";
  timeoutAction: "DEFAULT" | "reboot" | "crashdump" | "off";
  libCall: typeof initalLibCall;
} = {
  watchdogDict: {},
  delayStart: "DEFAULT",
  startmode: "DEFAULT",
  watchdogTimeout: "",
  timeoutActionFlush: "DEFAULT",
  timeoutAction: "DEFAULT",
  libCall: initalLibCall,
};

const initFromCluster = (cluster: Cluster) => {
  const sbdConfig = getClusterSbdConfig(cluster);
  const timeoutActionArray = sbdConfig?.SBD_TIMEOUT_ACTION?.split(",");

  let timeoutActionFlush = "DEFAULT";
  let timeoutAction = "DEFAULT";
  timeoutActionArray?.forEach((action) => {
    if (action === "flush" || action === "noflush") {
      timeoutActionFlush = action;
    } else if (
      action === "reboot"
      || action === "crashdump"
      || action === "off"
    ) {
      timeoutAction = action;
    }
  });

  return {
    ...initialState,
    watchdogDict: Object.values(cluster.nodeList).reduce(
      (watchdogDict, node) => {
        let watchdog = "";
        if (node.status !== "DATA_NOT_PROVIDED") {
          watchdog = node.sbd?.watchdog ?? "";
        }
        return { ...watchdogDict, [node.name]: watchdog };
      },
      {},
    ),
    delayStart: (sbdConfig?.SBD_DELAY_START === "yes"
    || sbdConfig?.SBD_DELAY_START === "no"
      ? sbdConfig?.SBD_DELAY_START
      : "DEFAULT") as typeof initialState.delayStart,
    startmode: (sbdConfig?.SBD_STARTMODE === "clean"
    || sbdConfig?.SBD_STARTMODE === "always"
      ? sbdConfig?.SBD_STARTMODE
      : "DEFAULT") as typeof initialState.startmode,
    watchdogTimeout:
      sbdConfig?.SBD_WATCHDOG_TIMEOUT as typeof initialState.watchdogTimeout,
    timeoutActionFlush:
      timeoutActionFlush as typeof initialState.timeoutActionFlush,
    timeoutAction: timeoutAction as typeof initialState.timeoutAction,
  };
};

export const sbdConfigure: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.SBD.CONFIGURE":
      return initFromCluster(action.payload.cluster);

    case "CLUSTER.SBD.CONFIGURE.UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    case "CLUSTER.SBD.CONFIGURE.CLOSE":
      return initialState;

    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
