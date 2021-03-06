import React from "react";
import { DataListCell } from "@patternfly/react-core";

import { types } from "app/store";

import { ConstraintResourceInRole, ConstraintValue } from "../common";
import {
  ConstraintResourceSetRscLinks,
  ConstraintRowWithResourceSet,
} from "../resourceSet";

import { ConstraintRowColocationTogether } from "./ConstraintRowColocationTogether";

export const ConstraintRowColocationSet: React.FC<{
  constraint: types.cluster.ConstraintColocationSet;
}> = ({ constraint }) => {
  return (
    <ConstraintRowWithResourceSet
      id={constraint.id}
      resourceSetList={constraint.sets}
      type="Colocation (set)"
      setCells={resourceSet => (
        <>
          <DataListCell width={4}>
            {"Resources "}
            <ConstraintResourceSetRscLinks resourceSet={resourceSet} />
            <ConstraintResourceInRole role={resourceSet.role} />
            <ConstraintRowColocationTogether constraint={constraint} />
          </DataListCell>
          <DataListCell width={1}>
            {"Score "}
            <strong>
              {resourceSet.score || constraint.score || "default"}
            </strong>
          </DataListCell>
        </>
      )}
      setContent={resourceSet => (
        <ConstraintValue label="Sequential" value={resourceSet.sequential} />
      )}
    />
  );
};
