import {clusterAppTabList} from "app/view/cluster/";

import {location, selectors} from "test/tools";

export * as fenceDevices from "./fenceDevices";
export * as resources from "./resources";
export * as nodes from "./nodes";
export * as nvsets from "./nvsets";
export * as acl from "./acl";

type ClusterTabName = typeof clusterAppTabList[number];

export const selectTab = async (tabName: ClusterTabName) => {
  await page.click(selectors.dt("tabs cluster", tabName));
};

export const goTo = async ({
  clusterName,
  tabName,
}: {
  clusterName: string;
  tabName?: ClusterTabName;
}) => {
  await page.goto(location.cluster({clusterName}));
  if (tabName) {
    await selectTab("acl");
  }
};
