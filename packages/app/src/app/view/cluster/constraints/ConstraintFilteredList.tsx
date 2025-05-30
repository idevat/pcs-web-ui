import React from "react";
import {DataList, Stack, StackItem, ToolbarItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  Card,
  EmptyStateClusterStopped,
  EmptyStateNoItem,
  ToolbarFilterAction,
  ToolbarFilterGroups,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import * as select from "./select";
import {ConstraintRowLocationNode, ConstraintRowLocationRule} from "./location";
import {
  ConstraintRowColocationPair,
  ConstraintRowColocationSet,
} from "./colocation";
import {ConstraintRowOrderPair, ConstraintRowOrderSet} from "./order";
import {ConstraintRowTicketResource, ConstraintRowTicketSet} from "./ticket";

type ConstraintPackList = ReturnType<typeof select.constraintPacks>;

const filterGroups = {
  Location: false,
  "Location (rule)": false,
  Colocation: false,
  "Colocation (set)": false,
  Order: false,
  "Order (set)": false,
  Ticket: false,
  "Ticket (set)": false,
};
const useState = () => {
  const groupState = ToolbarFilterGroups.useState(filterGroups);
  const [groupInclusionMap] = groupState;

  const filterConstraintTypes = React.useCallback(
    (constraintPacks: ConstraintPackList): ConstraintPackList =>
      constraintPacks.filter(cp =>
        ToolbarFilterGroups.allOrIncludedGroupMembers({
          groupInclusionMap,
          groupMembershipMap: {...filterGroups, [cp.type]: true},
        }),
      ),
    [groupInclusionMap],
  );
  return {
    filterState: {
      groupState,
    },
    filterConstraintTypes,
  };
};

export const ConstraintFilteredList = ({
  clusterName,
}: {
  clusterName: string;
}) => {
  const {filterState, filterConstraintTypes} = useState();
  const clearAllFilters = () => {
    const [groupInclusionMap, setGroupInclusionMap] = filterState.groupState;
    setGroupInclusionMap(
      ToolbarFilterGroups.unselectAllOptions(groupInclusionMap),
    );
  };
  const {constraints, hasCibInfo} = useLoadedCluster();
  const constraintPacks = select.constraintPacks(constraints);

  if (!hasCibInfo) {
    return (
      <EmptyStateClusterStopped
        title={"Cannot get constraints from stopped cluster"}
        clusterName={clusterName}
        {...testMarks.cluster.constraints.mark}
      />
    );
  }
  if (constraintPacks.length === 0) {
    return (
      <EmptyStateNoItem
        title="No constraint is configured."
        message="You don't have any configured constraint here."
        {...testMarks.cluster.constraints.mark}
      />
    );
  }
  return (
    <Card {...testMarks.cluster.constraints.mark}>
      <Stack hasGutter>
        <StackItem>
          <ToolbarFilterAction clearAllFilters={clearAllFilters}>
            <ToolbarItem>
              <ToolbarFilterGroups
                name="Constraint type"
                filterState={filterState.groupState}
              />
            </ToolbarItem>
          </ToolbarFilterAction>
        </StackItem>
        <StackItem>
          <DataList aria-label="Constraints">
            {filterConstraintTypes(constraintPacks).map((pack, i) => {
              switch (pack.type) {
                case "Location":
                  return (
                    <ConstraintRowLocationNode
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Location (rule)": {
                  return (
                    <ConstraintRowLocationRule
                      constraint={pack.constraint}
                      key={i}
                      uniqueId={i}
                    />
                  );
                }

                case "Colocation":
                  return (
                    <ConstraintRowColocationPair
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Colocation (set)":
                  return (
                    <ConstraintRowColocationSet
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Ticket":
                  return (
                    <ConstraintRowTicketResource
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Ticket (set)":
                  return (
                    <ConstraintRowTicketSet
                      constraint={pack.constraint}
                      key={i}
                    />
                  );

                case "Order":
                  return (
                    <ConstraintRowOrderPair
                      constraint={pack.constraint}
                      key={i}
                    />
                  );
                default:
                  return (
                    <ConstraintRowOrderSet
                      constraint={pack.constraint}
                      key={i}
                    />
                  );
              }
            })}
          </DataList>
        </StackItem>
      </Stack>
    </Card>
  );
};
