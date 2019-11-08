import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

import * as auth from "app/services/auth/sagas";
import * as api from "app/common/api";

import { validateSameNodes } from "./utils";
import { ApiCallGeneratorResult, createResult } from "./result";

const TAuthGuiAgainstNodesResult = t.type({
  node_auth_error: t.record(t.string, t.number),
});

const validate = (nodeList: string[], response: any) => {
  const result = TAuthGuiAgainstNodesResult.decode(response);
  if (!isRight(result)) {
    return PathReporter.report(result);
  }

  return validateSameNodes(nodeList, Object.keys(response.node_auth_error));
};

export type AuthGuiAgainstNodesResult = t.TypeOf<
  typeof TAuthGuiAgainstNodesResult
>;

export function* authGuiAgainstNodes(
  nodeMap: Record<string, {
    password: string;
    destinations: {
      address: string,
      port: string,
    }[];
  }>,
): ApiCallGeneratorResult<AuthGuiAgainstNodesResult> {
  const nodeMapToAuth = {
    nodes: Object.keys(nodeMap).reduce(
      (nodes, nodeName) => ({
        ...nodes,
        [nodeName]: {
          password: nodeMap[nodeName].password,
          dest_list: nodeMap[nodeName].destinations.map(
            destination => ({
              addr: destination.address,
              port: destination.port,
            }),
          ),
        },
      }),
      {},
    ),
  };
  try {
    const raw = yield auth.postForJson(
      "/manage/auth_gui_against_nodes",
      [["data_json", JSON.stringify(nodeMapToAuth)]],
    );
    return createResult<AuthGuiAgainstNodesResult>(
      raw,
      validate(Object.keys(nodeMap), raw),
    );
  } catch (e) {
    if (e instanceof api.error.ApiNotExpectedJson) {
      return createResult<AuthGuiAgainstNodesResult>(
        e.text,
        ["Response is not in expected json format"],
      );
    }
    throw e;
  }
}
