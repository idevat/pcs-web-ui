import {destroyCluster} from "app/backend";

import {api, processError, putNotification, put} from "./common";

export function* clusterDestroy() {
  const result: api.ResultOf<typeof destroyCluster> =
    yield api.authSafe(destroyCluster);

  if (result.type !== "OK") {
    yield processError(result, "cluster destroy");
    return;
  }

  yield put({type: "CLUSTER.STATUS.REFRESH"});
  yield putNotification("SUCCESS", "Cluster destroyed");
}
