import {app, type Response, type Request} from "dev/app";
import * as shortcut from "dev/shortcuts";

const noCluster = (_req: Request, res: Response) =>
  res
    .status(400)
    .send(
      "This host is not in a cluster - corosync.conf not present or not valid",
    );

app.clusterStatus(noCluster);
app.libClusterResourceAgentListAgents(noCluster);
app.libClusterStonithAgentListAgents(noCluster);
app.getClusterPropertiesDefinition(noCluster);
app.getPermissions(noCluster);

shortcut.getSetupClusterRelated();
