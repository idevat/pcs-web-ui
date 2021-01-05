import { getResourceAgentMetadata } from "app/backend";
import { ActionMap, selectors, types } from "app/store";

import { api, processError, put, select, takeEvery } from "./common";

type ApiCallResult = api.ResultOf<typeof getResourceAgentMetadata>;

function* loadResourceAgent({
  key,
  payload: { agentName },
}: ActionMap["RESOURCE_AGENT.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(
    getResourceAgentMetadata,
    key.clusterName,
    agentName,
  );

  const taskLabel = `load resource agent ${agentName}`;
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () =>
        put({
          type: "RESOURCE_AGENT.LOAD.FAILED",
          key,
          payload: { agentName },
        }),
    });
    return;
  }

  yield put({
    type: "RESOURCE_AGENT.LOAD.SUCCESS",
    key,
    payload: { apiAgentMetadata: result.payload },
  });
}

function* ensureResourceAgent({
  key,
  payload: { agentName },
}: ActionMap["RESOURCE_AGENT.ENSURE"]) {
  const pcmkAgent: types.pcmkAgents.StoredAgent = yield select(
    selectors.getPcmkAgent(key.clusterName, agentName),
  );
  if (!pcmkAgent || pcmkAgent.loadStatus === "FAILED") {
    yield put({
      type: "RESOURCE_AGENT.LOAD",
      key,
      payload: { agentName },
    });
  }
}

export default [
  takeEvery("RESOURCE_AGENT.LOAD", loadResourceAgent),
  takeEvery("RESOURCE_AGENT.ENSURE", ensureResourceAgent),
];
