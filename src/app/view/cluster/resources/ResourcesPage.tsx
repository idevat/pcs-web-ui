import {
  ClusterToolbar,
  GroupDetailView,
  useLauncherDisableClusterNotRunning,
  useLoadedCluster,
} from "app/view/share";

import {ResourceDetailPage} from "./ResourceDetailPage";
import {ResourceTree} from "./tree/ResourceTree";
import * as task from "./task";

export const ResourcesPage = () => {
  const {resourceTree} = useLoadedCluster();

  const launchDisable = useLauncherDisableClusterNotRunning();

  return (
    <>
      <ClusterToolbar
        toolbarName="resources"
        buttonsItems={[
          {
            name: "create-resource",
            task: {
              component: task.create.ResourceCreate,
              useTask: task.create.useTask,
            },
            launchDisable: launchDisable(
              "Cannot create resource on stopped cluster",
            ),
          },
          {
            name: "create-group",
            task: {
              component: task.createGroup.ResourceCreateGroup,
              useTask: task.createGroup.useTask,
            },
            launchDisable: launchDisable(
              "Cannot create resource group on stopped cluster",
            ),
          },
        ]}
      />
      <GroupDetailView
        groupCard={<ResourceTree resourceTree={resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
