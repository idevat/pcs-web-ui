import type {ActionMap, ActionPayload} from "app/store";

import {useTaskCommon} from "../useTaskCommon";

type AllowName =
  ActionPayload["CLUSTER.PERMISSIONS.SAVE"]["permissionList"][number]["allow"][number];

const taskName: ActionMap["CLUSTER.PERMISSIONS.SAVE"]["key"]["task"] =
  "permissionEdit";

export const useTask = () => {
  const task = useTaskCommon("permissionEdit");
  const {dispatch, close, state} = task;
  const {clusterName, currentPermissionList} = state;

  const key = {clusterName, task: taskName};

  const isCreate = state.initialPermission === null;
  return {
    ...task,
    name: taskName,
    state,
    label: `${isCreate ? "Creating" : "Updating"} permission`,
    isCreate,
    clusterName,
    dispatch,

    isNameValid: state.name.length > 0,
    areCompetenciesValid:
      state.read || state.write || state.grant || state.full,
    updateState: (payload: ActionPayload["CLUSTER.PERMISSION.EDIT.UPDATE"]) =>
      dispatch({
        type: "CLUSTER.PERMISSION.EDIT.UPDATE",
        key,
        payload,
      }),

    permissionEdit: () => {
      const initialPermission = state.initialPermission;

      const allow: AllowName[] = [
        ...(state.read ? ["read" as AllowName] : []),
        ...(state.write ? ["write" as AllowName] : []),
        ...(state.grant ? ["grant" as AllowName] : []),
        ...(state.full ? ["full" as AllowName] : []),
      ];
      const editPermission = {
        name: state.name,
        type: state.type,
        allow,
      };
      // biome-ignore lint/suspicious/noImplicitAnyLet:
      let permissionList;
      if (initialPermission === null) {
        permissionList = [...currentPermissionList, editPermission];
      } else {
        permissionList = currentPermissionList.map(p =>
          p.name !== initialPermission.name || p.type !== initialPermission.type
            ? p
            : editPermission,
        );
      }

      dispatch({
        type: "CLUSTER.PERMISSIONS.SAVE",
        key,
        payload: {permissionList},
      });
    },

    recoverFromError: () => {
      dispatch({
        type: "CLUSTER.PERMISSIONS.SAVE.ERROR.RECOVER",
        key,
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.PERMISSIONS.EDIT.CLOSE",
        key,
      });
      close();
    },
  };
};
