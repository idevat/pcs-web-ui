import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
} from "@patternfly/react-core";

export const EmptyStateBackendNotFound = () => {
  return (
    <EmptyState
      style={{margin: "auto"}}
      titleText="Pcsd server (backend) not found."
      headingLevel="h1"
    >
      <EmptyStateBody>
        To use HA Cluster Management, make sure pcsd service is running.
      </EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button
            variant="primary"
            onClick={() =>
              pcsUiEnvAdapter.jump("/system/services#/pcsd.service")
            }
          >
            Go to pcsd service settings.
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
};
