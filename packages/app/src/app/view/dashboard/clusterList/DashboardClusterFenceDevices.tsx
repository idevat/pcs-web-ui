import {testMarks} from "app/view/dataTest";
import {
  EmptyStateClusterStopped,
  EmptyStateNoItem,
  Link,
  StatusSign,
  Table,
  compareStatusSeverity,
  location,
  toLabel,
} from "app/view/share";

import {Cluster, FenceDevice} from "./types";
import {compareStrings} from "./utils";

type COLUMNS = "NAME" | "STATUS";

const compareByColumn = (
  column: COLUMNS | "",
): ((_a: FenceDevice, _b: FenceDevice) => number) => {
  switch (column) {
    case "STATUS":
      return (a, b) =>
        compareStatusSeverity(a.statusSeverity, b.statusSeverity);

    default:
      return (a, b) => compareStrings(a.id, b.id);
  }
};

const {SortableTh} = Table;

const {list} = testMarks.dashboard.clusterList.cluster.loaded.fenceDevices;

export const DashboardClusterFenceDevices = ({cluster}: {cluster: Cluster}) => {
  const {sortState, compareItems} = SortableTh.useSorting<COLUMNS>("NAME");

  if (!cluster.hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title="Cannot get fence devices from stopped cluster"
        clusterName={cluster.name}
      />
    );
  }

  if (cluster.fenceDeviceList.length === 0) {
    return (
      <EmptyStateNoItem
        title="No fence device is configured."
        message="You don't have any configured fence device here."
      />
    );
  }
  return (
    <Table isCompact isBorderless {...list.mark}>
      <thead>
        <tr>
          <SortableTh columnName="NAME" sortState={sortState}>
            Fence device
          </SortableTh>
          <SortableTh columnName="STATUS" sortState={sortState} startDesc>
            Status
          </SortableTh>
        </tr>
      </thead>
      <tbody>
        {cluster.fenceDeviceList
          .sort(compareItems(compareByColumn))
          .map(fenceDevice => (
            <tr key={fenceDevice.id} {...list.fenceDevice.mark}>
              <td data-test="name">
                <Link
                  to={location.fenceDevice({
                    clusterName: cluster.name,
                    fenceDeviceId: fenceDevice.id,
                  })}
                  {...list.fenceDevice.id.mark}
                />
              </td>
              <td {...list.fenceDevice.status.mark}>
                <StatusSign
                  status={fenceDevice.statusSeverity}
                  label={toLabel(fenceDevice.status)}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};
