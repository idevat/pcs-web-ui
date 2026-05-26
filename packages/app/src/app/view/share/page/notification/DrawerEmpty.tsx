import {EmptyState, EmptyStateBody} from "@patternfly/react-core";
import {SearchIcon} from "@patternfly/react-icons";

export const DrawerEmpty = () => {
  return (
    <EmptyState
      variant="full"
      icon={SearchIcon}
      titleText="No alerts found"
      headingLevel="h2"
    >
      <EmptyStateBody>There are currently no alerts.</EmptyStateBody>
    </EmptyState>
  );
};
