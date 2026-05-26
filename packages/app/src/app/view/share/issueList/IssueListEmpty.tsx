import {EmptyState, EmptyStateBody} from "@patternfly/react-core";
import {CheckCircleIcon} from "@patternfly/react-icons";

export const IssueListEmpty = () => {
  return (
    <EmptyState
      variant="sm"
      style={{margin: "auto"}}
      status="success"
      icon={CheckCircleIcon}
      titleText="No issues"
      headingLevel="h3"
    >
      <EmptyStateBody>Pcsd has not detected any issue here</EmptyStateBody>
    </EmptyState>
  );
};
