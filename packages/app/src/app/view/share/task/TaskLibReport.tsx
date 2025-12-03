import type React from "react";
import {Alert} from "@patternfly/react-core";
import {ArchiveIcon} from "@patternfly/react-icons";

import type {types} from "app/store";

import type {TaskReport} from "./TaskReport";

const severityToAlertVariant = (
  level: types.LibReport["severity"]["level"],
): React.ComponentProps<typeof Alert>["variant"] => {
  switch (level) {
    case "ERROR":
      return "danger";

    case "WARNING":
      return "warning";

    case "DEPRECATION":
      return "custom";

    default:
      return "info";
  }
};

export const TaskLibReport = (props: {
  report: TaskReport;
  "data-test"?: string;
}) => {
  const {report} = props;
  const level = "severity" in report ? report.severity.level : report.level;
  const isDeprecation = level === "DEPRECATION";

  return (
    <Alert
      variant={severityToAlertVariant(level)}
      isInline
      isPlain
      title={
        "severity" in report
          ? `${report.message.message}${
              report.severity.force_code !== null ? " (can be overridden)" : ""
            }`
          : report.message
      }
      data-test={props["data-test"]}
      customIcon={isDeprecation ? <ArchiveIcon /> : undefined}
      className={isDeprecation ? "pf-m-deprecated-alert" : undefined}
    />
  );
};
