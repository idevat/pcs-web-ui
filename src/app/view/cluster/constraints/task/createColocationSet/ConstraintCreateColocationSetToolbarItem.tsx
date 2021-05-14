import React from "react";
import { Button } from "@patternfly/react-core";

import { ClusterWizardFooter, Wizard } from "app/view/share";

import { useTask } from "./useTask";
import { Options } from "./Options";
import { ResourceSetList } from "./ResourceSetList";
import { Review } from "./Review";
import { Finish } from "./Finish";

export const ConstraintCreateColocationSetToolbarItem: React.FC<{
  variant?: React.ComponentProps<typeof Button>["variant"];
}> = ({ variant = "primary" }) => {
  const {
    open,
    close,
    create,
    isOpened,
    areSetsValid,
    isCustomIdValid,
  } = useTask();
  return (
    <>
      <Button
        variant={variant}
        onClick={open}
        data-test="constraint-colocation-create"
      >
        Create Colocation Set
      </Button>
      {isOpened && (
        <Wizard
          data-test="task-constraint-colocation-set-create"
          title="New colocation set constraint"
          description="Create colocation set constraint"
          onClose={close}
          steps={[
            {
              name: "Resource Sets",
              component: <ResourceSetList />,
              footer: (
                <ClusterWizardFooter
                  onClose={close}
                  nextIf={areSetsValid}
                  backDisabled
                />
              ),
            },
            {
              name: "Options",
              canJumpTo: areSetsValid,
              component: <Options />,
              footer: (
                <ClusterWizardFooter onClose={close} nextIf={isCustomIdValid} />
              ),
            },
            {
              name: "Review",
              canJumpTo: areSetsValid && isCustomIdValid,
              component: <Review />,
              footer: (
                <ClusterWizardFooter
                  preNext={() => create({ force: false })}
                  nextLabel="Create constraint"
                  onClose={close}
                />
              ),
            },
            {
              name: "Result",
              component: <Finish />,
              isFinishedStep: true,
            },
          ]}
        />
      )}
    </>
  );
};