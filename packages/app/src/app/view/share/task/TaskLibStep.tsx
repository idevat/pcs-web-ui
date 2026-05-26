import type React from "react";
import {Content, Stack, StackItem} from "@patternfly/react-core";

import {TaskLibReportList} from "./TaskLibReportList";

export const TaskLibStep = (props: {
  title: string;
  reports?: React.ComponentProps<typeof TaskLibReportList>["reports"];
  children?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <Stack hasGutter data-test={props["data-test"]}>
      <StackItem>
        <Content component="h2">{props.title}</Content>
      </StackItem>
      <StackItem>{props.children}</StackItem>
      <StackItem>
        <TaskLibReportList reports={props.reports ?? []} />
      </StackItem>
    </Stack>
  );
};
