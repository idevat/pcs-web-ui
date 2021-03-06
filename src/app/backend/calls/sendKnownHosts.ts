import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.sendKnownHosts;

export const sendKnownHosts = async (
  clusterName: string,
  nodeList: string[],
): api.CallResult => {
  const uniqueNodeList = Array.from(new Set(nodeList));

  return http.post(url({ clusterName }), {
    params: uniqueNodeList.map(node => ["node_names[]", node]),
  });
};
