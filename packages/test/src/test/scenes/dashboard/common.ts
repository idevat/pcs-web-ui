const {cluster} = marks.dashboard.clusterList;

export const launchClusterItemAction = async (
  clusterName: string,
  search: (c: typeof cluster.actions) => Mark,
) => {
  await dropdown(
    item.byName(cluster, clusterName, c => c.actions),
    search(cluster.actions),
  );
};
