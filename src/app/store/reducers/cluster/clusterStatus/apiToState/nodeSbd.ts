import { ActionPayload } from "app/store/actions";

import { Cluster } from "../types";

type ApiNodeWithData = Exclude<
  ActionPayload["CLUSTER.STATUS.FETCH.OK"]["node_list"][number],
  { status: "unknown" }
>;
type Sbd = Exclude<
  Cluster["nodeList"][number],
  { status: "DATA_NOT_PROVIDED" }
>["sbd"];

export const apiToNodeSbd = (apiNode: ApiNodeWithData): Sbd => {
  const { sbd_config } = apiNode;

  if (sbd_config === null) {
    return undefined;
  }

  return {
    config: sbd_config,
    watchdog: sbd_config.SBD_WATCHDOG_DEV,
  };
};
