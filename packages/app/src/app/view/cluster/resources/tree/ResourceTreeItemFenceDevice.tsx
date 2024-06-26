import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
  DataListToggle,
} from "@patternfly/react-core";

import {FenceDevice} from "app/view/cluster/types";
import {StatusIco, StatusSign} from "app/view/share";
import {useGroupDetailViewContext} from "app/view/cluster/share";

import {ResourceTreeCellName} from "./ResourceTreeCellName";
import {ResourceTreeCellType} from "./ResourceTreeCellType";

export const ResourceTreeItemFenceDevice = ({
  fenceDevice,
}: {
  fenceDevice: FenceDevice;
}) => {
  const {compact} = useGroupDetailViewContext();
  return (
    <DataListItem
      aria-labelledby={`resource-tree-item-${fenceDevice.id}`}
      id={fenceDevice.id}
    >
      <DataListItemRow>
        <DataListToggle
          aria-label="Resource toggle"
          id={`resource-tree-toggle-${fenceDevice.id}`}
          aria-hidden="true"
        />
        <DataListItemCells
          dataListCells={[
            <DataListCell key={fenceDevice.id}>
              <ResourceTreeCellName resourceId={fenceDevice.id} />
            </DataListCell>,
            <DataListCell key={`${fenceDevice.id}.type`}>
              <ResourceTreeCellType
                type={fenceDevice.type}
                typeDescription="stonith"
              />
            </DataListCell>,
          ]}
        />
        {compact && (
          <div className="ha-c-data-list__item-status">
            <StatusIco status="ERROR" />
            {fenceDevice.statusSeverity !== "OK" && " 1"}
          </div>
        )}
        {!compact && (
          <div className="ha-c-data-list__item-status">
            <StatusSign status="ERROR" label="Bad placement" />
          </div>
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
