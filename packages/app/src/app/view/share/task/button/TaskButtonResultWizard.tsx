import {useWizardContext} from "@patternfly/react-core";

import {TaskButtonResult} from "./TaskButtonResult";

export const TaskButtonResultWizard = (props: {
  stepName: string;
  label: string;
  variant?: React.ComponentProps<typeof TaskButtonResult>["variant"];
  "data-test": string;
}) => {
  const {goToStepByName} = useWizardContext();
  return (
    <TaskButtonResult
      variant={props.variant ?? "secondary"}
      label={props.label}
      action={() => goToStepByName(props.stepName)}
      data-test={props["data-test"]}
    />
  );
};
