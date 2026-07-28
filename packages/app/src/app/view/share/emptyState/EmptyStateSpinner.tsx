import type React from "react";
import {EmptyState, Spinner} from "@patternfly/react-core";

export const EmptyStateSpinner = (props: {
  title: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState
      style={{margin: "auto"}}
      data-test={props["data-test"]}
      icon={Spinner}
      titleText={props.title}
      headingLevel="h3"
    />
  );
};
