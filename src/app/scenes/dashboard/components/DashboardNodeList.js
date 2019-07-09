import React from "react";

import { Table, StatusIco } from "app/components";
import { NODE } from "app/services/cluster/status-constants";
import { mapConstants } from "app/utils";

const { STATUS, QUORUM } = NODE;

const formatStatus = mapConstants("unknown", {
  [STATUS.ONLINE]: "online",
  [STATUS.OFFLINE]: "offline",
});

const formatQuorum = mapConstants("unknown", {
  [QUORUM.YES]: "yes",
  [QUORUM.NO]: "no",
});

export const nodesToSummaryStatus = nodeList => nodeList.reduce(
  (sumStatus, node) => {
    if (
      sumStatus === StatusIco.STATUS_MAP.ERROR
      ||
      node.status === STATUS.OFFLINE
    ) {
      return StatusIco.STATUS_MAP.ERROR;
    }
    if (
      sumStatus === StatusIco.STATUS_MAP.WARNING
      ||
      node.quorum === QUORUM.NO
    ) {
      return StatusIco.STATUS_MAP.WARNING;
    }
    if (
      sumStatus === StatusIco.STATUS_MAP.UNKNOWN
      ||
      node.status !== STATUS.ONLINE
      ||
      node.quorum !== QUORUM.YES
    ) {
      return StatusIco.STATUS_MAP.UNKNOWN;
    }
    return StatusIco.STATUS_MAP.OK;
  },
  StatusIco.STATUS_MAP.OK,
);
const DashboardNodeList = ({ nodeList }) => (
  <Table isCompact isBorderless>
    <thead>
      <tr>
        <th>Node</th>
        <th>Status</th>
        <th>Quorum</th>
      </tr>
    </thead>
    <tbody>
      {nodeList.map(node => (
        <tr key={node.name}>
          <td>{node.name}</td>
          <td>{formatStatus(node.status)}</td>
          <td>{formatQuorum(node.quorum)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default DashboardNodeList;
