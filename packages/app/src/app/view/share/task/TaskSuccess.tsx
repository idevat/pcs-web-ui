import type React from "react";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateFooter,
} from "@patternfly/react-core";
import {CheckCircleIcon} from "@patternfly/react-icons";

import {useTaskContext} from "./TaskContext";

export const TaskSuccess = (props: {
  primaryAction: React.ReactNode;
  secondaryActions?: React.ReactNode;
  "data-test"?: string;
}) => {
  const {taskLabel} = useTaskContext();
  return (
    <EmptyState
      style={{margin: "auto"}}
      data-test={props["data-test"] ?? "task-success"}
      status="success"
      icon={CheckCircleIcon}
      titleText={`Task "${taskLabel}" has been done successfully`}
      headingLevel="h4"
    >
      <EmptyStateFooter>
        <EmptyStateActions>{props.primaryAction}</EmptyStateActions>
        <EmptyStateActions>{props.secondaryActions}</EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
};
