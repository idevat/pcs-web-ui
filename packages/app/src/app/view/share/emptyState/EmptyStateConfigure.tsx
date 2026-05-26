import type React from "react";
import {EmptyState, EmptyStateBody} from "@patternfly/react-core";
import {WrenchIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

const UnknownWrenchIcon = (props: Record<string, unknown>) => (
  <WrenchIcon {...props} color={palette.UNKNOWN} />
);

export const EmptyStateConfigure = (props: {
  title: React.ReactNode;
  message: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <EmptyState
      style={{margin: "auto"}}
      data-test={props["data-test"]}
      icon={UnknownWrenchIcon}
      titleText={props.title}
      headingLevel="h3"
    >
      <EmptyStateBody>{props.message}</EmptyStateBody>
    </EmptyState>
  );
};
