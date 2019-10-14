import React from "react";
import {
  DataList,
} from "@patternfly/react-core";
import { ResourceTreeItem } from "app/services/cluster/types";

import * as url from "app/common/urls";

import ResourceTreeItemPrimitive from "./ResourceTreeItemPrimitive";
import ResourceTreeItemClone from "./ResourceTreeItemClone";
import ResourceTreeItemGroup from "./ResourceTreeItemGroup";

const ResourceTree = ({
  resourceTree,
  createResourceDetailUrl,
  compact = false,
}: {
  resourceTree: ResourceTreeItem[],
  createResourceDetailUrl: (id: string) => string,
  compact?: boolean,
}) => (
  <DataList
    aria-label="Cluster resource list"
    className={`ha-c-tree-view${compact ? "" : " ha-m-full-width"}`}
  >
    {resourceTree.map((resourceTreeItem) => {
      switch (resourceTreeItem.itemType) {
        case "primitive": return (
          <ResourceTreeItemPrimitive
            key={resourceTreeItem.id}
            primitive={resourceTreeItem}
            createResourceDetailUrl={createResourceDetailUrl}
          />
        );
        case "group": return (
          <ResourceTreeItemGroup
            key={resourceTreeItem.id}
            group={resourceTreeItem}
            createResourceDetailUrl={createResourceDetailUrl}
          />
        );
        case "clone": default: return (
          <ResourceTreeItemClone
            key={resourceTreeItem.id}
            clone={resourceTreeItem}
            createResourceDetailUrl={createResourceDetailUrl}
          />
        );
      }
    })}
  </DataList>
);

ResourceTree.createResourceDetailUrl = (
  (clusterUrlName: string) => (resourceUrlName: string) => url.resourcesDetail(
    clusterUrlName,
    resourceUrlName,
  )
);

export default ResourceTree;
