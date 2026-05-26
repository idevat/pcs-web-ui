import type React from "react";
import {
  EmptyState,
  Progress,
  ProgressMeasureLocation,
} from "@patternfly/react-core";

export const TaskProgress = ({
  title,
  progressTitle,
}: {
  title: React.ReactNode;
  progressTitle?: string;
}) => {
  return (
    <EmptyState titleText={title} headingLevel="h4">
      <Progress
        value={50}
        title={progressTitle}
        aria-label="task progress"
        measureLocation={ProgressMeasureLocation.none}
      />
    </EmptyState>
  );
};
