import React from "react";

import {type ActionLeaf, CLUSTER_KEY} from "app/store";
import {useDispatch} from "app/view/share";

export const useClusterLoad = () => {
  const dispatch = useDispatch();

  const start = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC",
      key: {clusterName: CLUSTER_KEY},
    }),
    [],
  );

  const stop = React.useMemo<ActionLeaf>(
    () => ({
      type: "CLUSTER.STATUS.SYNC.STOP",
      key: {clusterName: CLUSTER_KEY},
    }),
    [],
  );

  React.useEffect(() => {
    dispatch({
      type: "DATA_READING.SET_UP",
      payload: {
        behavior: "replace",
        readings: [{id: `syncCluster:${CLUSTER_KEY}`, start, stop}],
      },
    });

    dispatch({
      type: "CLUSTER.PROPERTIES.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });

    dispatch({
      type: "CLUSTER.PERMISSIONS.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });

    dispatch({
      type: "RESOURCE_AGENT.LIST.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });
    dispatch({
      type: "FENCE_AGENT.LIST.LOAD",
      key: {clusterName: CLUSTER_KEY},
    });
  }, [dispatch, start, stop]);
};
