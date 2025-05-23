import type React from "react";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

export const TaskFinishError = (props: {
  title: React.ReactNode;
  message: React.ReactNode;
  primaryAction: React.ReactNode;
  secondaryActions?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState data-test={props["data-test"] ?? "task-error"}>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={palette.ERROR} />
      <Title headingLevel="h4" size="lg">
        {props.title}
      </Title>
      <EmptyStateBody>{props.message}</EmptyStateBody>

      <EmptyStateActions>{props.primaryAction}</EmptyStateActions>
      <EmptyStateActions>{props.secondaryActions}</EmptyStateActions>
    </EmptyState>
  );
};
