import React from "react";
import { ActionList, ActionListItem } from "@patternfly/react-core";

import {
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";
import { selectors } from "app/store";

import { FenceDeviceCreateToolbarItem } from "./task";
import { FenceDeviceDetailPage } from "./FenceDeviceDetailPage";
import { FenceDeviceList } from "./list";

export const FenceDevicePage: React.FC<{ urlPrefix: string }> = ({
  urlPrefix,
}) => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <FenceDeviceCreateToolbarItem />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>
      <GroupDetailView
        urlPrefix={urlPrefix}
        detailCard={<FenceDeviceDetailPage />}
        groupCard={
          <FenceDeviceList fenceDeviceList={cluster.fenceDeviceList} />
        }
      />
    </>
  );
};
