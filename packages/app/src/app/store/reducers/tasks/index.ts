import {combineReducers} from "redux";

import {
  type ReducersMapKey,
  type Task,
  type TaskState,
  wrapTasks,
} from "app/store/taskTools";

import {clusterSetup} from "./clusterSetup";
import {clusterStop} from "./clusterStop";
import {importExistingCluster} from "./importExistingCluster";
import {resourceCreate} from "./resourceCreate";
import {resourceBan} from "./resourceBan";
import {resourceClear} from "./resourceClear";
import {resourceMove} from "./resourceMove";
import {fenceDeviceCreate} from "./fenceDeviceCreate";
import {fenceDeviceArgsEdit} from "./fenceDeviceArgsEdit";
import {primitiveGroupChange} from "./primitiveGroupChange";
import {constraintLocationCreate} from "./constraintLocationCreate";
import {constraintOrderCreate} from "./constraintOrderCreate";
import {constraintOrderSetCreate} from "./constraintOrderSetCreate";
import {constraintTicketCreate} from "./constraintTicketCreate";
import {constraintTicketSetCreate} from "./constraintTicketSetCreate";
import {constraintColocationCreate} from "./constraintColocationCreate";
import {constraintColocationSetCreate} from "./constraintColocationSetCreate";
import {resourceDelete} from "./resourceDelete";
import {resourceGroup} from "./resourceGroup";
import {nodeAdd} from "./nodeAdd";
import {nodeStop} from "./nodeStop";
import {fixAuth} from "./fixAuth";
import {permissionEdit} from "./permissionEdit";
import {nvpairEdit} from "./nvpairEdit";
import {sbdDisable} from "./sbdDisable";
import {sbdConfigure} from "./sbdConfigure";
import {aclRoleCreate} from "./aclRoleCreate";
import {aclRolePermissionAdd} from "./aclRolePermissionAdd";
import {aclSubjectCreate} from "./aclSubjectCreate";
import {aclSubjectAssign} from "./aclSubjectAssign";

const wrapTaskReducer =
  <STATE extends TaskState>(
    key: ReducersMapKey<STATE>,
    task: Task<STATE>,
  ): Task<STATE> =>
  (state, action) => {
    if (
      // undefined state means initialization - so the action can be drilled
      // down to original `task` reducer to get initial state.
      state !== undefined &&
      "key" in action &&
      "task" in action.key &&
      action.key.task !== key
    ) {
      return state;
    }
    return task(state, action);
  };
export const tasks = combineReducers(
  wrapTasks(wrapTaskReducer)({
    clusterSetup,
    clusterStop,
    importExistingCluster,
    resourceCreate,
    resourceBan,
    resourceClear,
    resourceMove,
    fenceDeviceCreate,
    fenceDeviceArgsEdit,
    primitiveGroupChange,
    constraintLocationCreate,
    constraintOrderCreate,
    constraintOrderSetCreate,
    constraintTicketCreate,
    constraintTicketSetCreate,
    constraintColocationCreate,
    constraintColocationSetCreate,
    resourceDelete,
    resourceGroup,
    nodeAdd,
    nodeStop,
    fixAuth,
    permissionEdit,
    nvpairEdit,
    sbdDisable,
    sbdConfigure,
    aclRoleCreate,
    aclRolePermissionAdd,
    aclSubjectCreate,
    aclSubjectAssign,
  }),
);
