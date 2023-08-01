import {testMarks} from "app/view/dataTest";
import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskFooter,
  WizardFooterNext,
} from "app/view/share";

import {useTask} from "./useTask";

const {next, back, cancel} = testMarks.task.createAclRole.reviewFooter;

export const ReviewFooter = () => {
  const {aclRoleCreate} = useTask();
  return (
    <TaskFooter {...testMarks.task.createAclRole.reviewFooter.mark}>
      <WizardFooterNext
        label="Create role"
        preAction={() => aclRoleCreate()}
        {...next.mark}
      />
      <TaskButtonBack {...back.mark} />
      <TaskButtonCancel {...cancel.mark} />
    </TaskFooter>
  );
};
