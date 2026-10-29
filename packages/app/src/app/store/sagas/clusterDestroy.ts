import {destroyCluster} from "app/backend";
import type {ActionMap} from "app/store/actions";

import {api, processError, putNotification, put} from "./common";

export function* clusterDestroy({payload}: ActionMap["CLUSTER.DESTROY"]) {
  const result: api.ResultOf<typeof destroyCluster> =
    yield api.authSafe(destroyCluster);

  if (result.type !== "OK") {
    yield processError(result, payload.clusterName);
    return;
  }

  yield put({type: "CLUSTER.STATUS.REFRESH"});
  yield putNotification("SUCCESS", "Cluster destroyed");
}
