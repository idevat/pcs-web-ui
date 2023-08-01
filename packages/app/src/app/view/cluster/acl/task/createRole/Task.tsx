import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

import {useTask} from "./useTask";
import {RoleName} from "./RoleName";
import {RoleNameFooter} from "./RoleNameFooter";
import {AddPermissions} from "./AddPermissions";
import {AddPermissionsFooter} from "./AddPermissionsFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Result} from "./Result";

const {createAclRole} = testMarks.task;

const enterRoleName = "Enter role name";
const review = "Review";

export const Task = () => {
  const {
    clusterName,
    close,
    isNameValid,
    invalidPermissionIndexes,
    state: {roleId},
  } = useTask();
  const taskLabel = `create acl role ${roleId}`;
  return (
    <Wizard
      task="aclRoleCreate"
      clusterName={clusterName}
      taskLabel={taskLabel}
      {...createAclRole.mark}
      description="Create acl role"
      onClose={close}
      steps={[
        {
          name: enterRoleName,
          component: <RoleName />,
          footer: <RoleNameFooter />,
        },
        {
          name: "Specify permissions",
          component: <AddPermissions />,
          canJumpTo: isNameValid,
          footer: <AddPermissionsFooter />,
        },
        {
          name: review,
          component: <Review />,
          footer: <ReviewFooter />,
          canJumpTo: isNameValid && invalidPermissionIndexes.length === 0,
        },
        {
          name: "Result",
          component: <Result backStep={enterRoleName} reviewStep={review} />,
          isFinishedStep: true,
        },
      ]}
    />
  );
};
