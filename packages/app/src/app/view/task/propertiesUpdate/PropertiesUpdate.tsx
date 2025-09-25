import {testMarks} from "app/view/dataTest";
import {
  TaskButtonCancel,
  TaskButtonNext,
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskFinishError,
  TaskSimpleOldApi,
} from "app/view/share";

const {propertiesUpdate: task} = testMarks.task;

import {useTask} from "./useTask";
import {Success} from "./Success";

export const PropertiesUpdate = () => {
  const {name: taskName, close, propertiesUpdate, state} = useTask();
  const taskLabel = "Edit cluster properties";
  return (
    <TaskSimpleOldApi
      title={`${taskLabel}?`}
      taskLabel={taskLabel}
      task={taskName}
      close={close}
      response={state.response}
      waitTitle={`Task "${taskLabel}" in progress`}
      footer={
        <>
          <TaskButtonNext run={() => propertiesUpdate()} {...task.run.mark}>
            Edcit cluster properties
          </TaskButtonNext>
          <TaskButtonCancel {...task.cancel.mark} />
        </>
      }
      configure={<>Edit cluster properties</>}
      success={<Success />}
      fail={
        <TaskFinishError
          title={`Task "${taskLabel}" failed`}
          message={state.resultMessage}
          primaryAction={
            <TaskButtonResult
              label={"Try again"}
              action={() => propertiesUpdate()}
              {...task.fail.tryAgain.mark}
            />
          }
          secondaryActions={
            <TaskButtonResultCancel {...task.fail.cancel.mark} />
          }
          {...task.fail.mark}
        />
      }
      {...task.mark}
    />
  );
};
