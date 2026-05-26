import type React from "react";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

export const TaskFinishError = (props: {
  title: React.ReactNode;
  message: React.ReactNode;
  primaryAction: React.ReactNode;
  secondaryActions?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState
      data-test={props["data-test"] ?? "task-error"}
      status="danger"
      icon={ExclamationCircleIcon}
      titleText={props.title}
      headingLevel="h4"
    >
      <EmptyStateBody>{props.message}</EmptyStateBody>

      <EmptyStateFooter>
        <EmptyStateActions>{props.primaryAction}</EmptyStateActions>
        <EmptyStateActions>{props.secondaryActions}</EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
};
