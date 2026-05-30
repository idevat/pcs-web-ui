import React from "react";
import {
  ActionList,
  ActionListGroup,
  ActionListItem,
} from "@patternfly/react-core";
import {WizardFooter as PfWizardFooter} from "@patternfly/react-core/deprecated";

export const TaskFooter = (
  props: React.PropsWithChildren<{"data-test": string}>,
) => {
  return (
    <div data-test={props["data-test"]}>
      <PfWizardFooter>
        <ActionList>
          <ActionListGroup>
            {React.Children.map(props.children, child =>
              child ? <ActionListItem>{child}</ActionListItem> : null,
            )}
          </ActionListGroup>
        </ActionList>
      </PfWizardFooter>
    </div>
  );
};
