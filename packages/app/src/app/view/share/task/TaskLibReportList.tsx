import type React from "react";
import {Content} from "@patternfly/react-core";

import {TaskLibReport} from "./TaskLibReport";
import type {TaskReport} from "./TaskReport";

export const TaskLibReportList = (props: {
  reports: TaskReport[];
  renderReport?: (report: TaskReport, i: number) => React.ReactNode;
  "data-test"?: string;
}) => {
  if (props.reports.length === 0) {
    return null;
  }

  return (
    <div data-test={props["data-test"]}>
      <Content component="h3">Messages</Content>
      {props.reports.map(
        props.renderReport ??
          ((report, i) => <TaskLibReport key={i} report={report} />),
      )}
    </div>
  );
};
