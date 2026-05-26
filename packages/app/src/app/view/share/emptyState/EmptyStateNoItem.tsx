import type React from "react";
import {EmptyState, EmptyStateBody} from "@patternfly/react-core";
import {PlusCircleIcon, SearchIcon} from "@patternfly/react-icons";

export const EmptyStateNoItem = (props: {
  title: React.ReactNode;
  message?: React.ReactNode;
  canAdd?: boolean;
  "data-test"?: string;
}) => {
  return (
    <EmptyState
      style={{margin: "auto"}}
      data-test={props["data-test"]}
      icon={props.canAdd ? PlusCircleIcon : SearchIcon}
      titleText={props.title}
      headingLevel="h3"
    >
      {props.message && <EmptyStateBody>{props.message}</EmptyStateBody>}
    </EmptyState>
  );
};
