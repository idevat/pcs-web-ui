import {PageSection} from "@patternfly/react-core";

import {EmptyStateSpinner, Page} from "app/view/share";

export const AppLoadingUserInfo = () => {
  return (
    <Page>
      {_notifications => (
        <>
          <PageSection>
            <EmptyStateSpinner title="Loading user info..." />
          </PageSection>
        </>
      )}
    </Page>
  );
};
