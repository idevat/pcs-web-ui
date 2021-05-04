import React from "react";

import {
  TaskFinishErrorLib,
  TaskFinishFailLib,
  TaskProgress,
  TaskSuccessLib,
} from "app/view/share";

import { useTask } from "./useTask";

export const Finish: React.FC = () => {
  const {
    close,
    create,
    state: { response, reports },
    wizard: { goToStepByName },
  } = useTask();
  switch (response) {
    case "success":
      return (
        <TaskSuccessLib
          title={"Constraint has been created successfully"}
          close={close}
          reports={reports}
        />
      );
    case "fail":
      return (
        <TaskFinishFailLib
          title={"Create constraint order with resource sets failed"}
          toFirstStep={() => goToStepByName("Options")}
          close={close}
          createForce={() => create({ force: true })}
          createForceLabel={
            <>Create order constraint anyway (proceed with current settings)</>
          }
          reports={reports}
        />
      );
    case "communication-error":
      return (
        <TaskFinishErrorLib
          title="Communication error while creating the order constraint"
          tryAgain={() => goToStepByName("Review")}
          close={close}
        />
      );
    default:
      return (
        <TaskProgress
          title={"Create new constraint order with resource sets"}
          progressTitle="Creating constraint order with resource sets"
        />
      );
  }
};