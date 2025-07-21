import {endpoint} from "./endpoint";

export const apiv2Create = () =>
  endpoint({
    url: ({clusterName}: {clusterName: string}) =>
      `/managec/${clusterName}/api/v2/task/create`,
    method: "post",
    shape: libShape(t.null),
  });
