import type React from "react";
import {EmptyState, EmptyStateBody} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

export const EmptyStateError = (props: {
  title: string;
  message: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState
      style={{margin: "auto"}}
      data-test={props["data-test"]}
      status="danger"
      icon={ExclamationCircleIcon}
      titleText={props.title}
      headingLevel="h3"
    >
      <EmptyStateBody>{props.message}</EmptyStateBody>
    </EmptyState>
  );
};
