import {Alert} from "@patternfly/react-core";

import {LauncherDropdown} from "app/view/share";
import {useOpenTask} from "app/view/task";
import {testMarks} from "app/view/dataTest";

const {actions} = testMarks.dashboard.clusterList.cluster;

export const DashboardClusterMenu = ({clusterName}: {clusterName: string}) => {
  const openTask = useOpenTask();
  return (
    <LauncherDropdown
      {...actions.mark}
      items={[
        {
          name: "start",
          confirm: {
            title: "Start cluster?",
            description: "Start the on all nodes",
            action: {
              type: "DASHBOARD.CLUSTER.START",
              payload: {clusterName},
            },
          },
          ...actions.start.mark,
        },
        {
          name: "stop",
          run: () =>
            openTask("clusterStop", {
              type: "CLUSTER.STOP.INIT",
              payload: {clusterName},
            }),
          ...actions.stop.mark,
        },
        {
          name: "remove",
          confirm: {
            title: `Remove the cluster "${clusterName}"?`,
            description: (
              <>
                This only removes the cluster from the Web UI, it does not stop
                the cluster from running.
              </>
            ),
            action: {
              type: "DASHBOARD.CLUSTER.REMOVE",
              payload: {clusterName},
            },
          },
          ...actions.remove.mark,
        },
        {
          name: "destroy",
          confirm: {
            title: `Destroy the cluster "${clusterName}"?`,
            titleVariant: "warning",
            description: (
              <>
                <div className="pf-v5-u-mb-sm">
                  The cluster will be stopped and all its configuration files
                  will be deleted.
                </div>
                <Alert
                  title={
                    <div {...actions.destroy.warning.mark}>
                      This command permanently removes any cluster configuration
                      that has been created. This action cannot be undone.
                    </div>
                  }
                  isPlain
                  isInline
                  variant="warning"
                />
              </>
            ),
            action: {
              type: "DASHBOARD.CLUSTER.DESTROY",
              payload: {clusterName},
            },
          },
          ...actions.destroy.mark,
        },
      ]}
    />
  );
};
