import { clusterPageTabList } from "app/view/cluster";

import { dt } from "test/tools/selectors";

export * as fenceDevices from "./fenceDevices";
export * as resources from "./resources";
export * as nodes from "./nodes";
export * as utilization from "./utilization";

export const selectTab = async (tabName: typeof clusterPageTabList[number]) => {
  await page.click(dt("tabs cluster", tabName));
};
