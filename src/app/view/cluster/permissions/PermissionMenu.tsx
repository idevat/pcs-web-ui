import { Action } from "app/store";
import { DropdownActionListMenu, ModalAction } from "app/view/share";

import { useTask } from "./task/useTask";
import { Permission } from "./types";
import { usePermissions } from "./usePermissions";

export const PermissionMenu: React.FC<{
  permission: Permission;
}> = ({ permission }) => {
  const { open } = useTask();
  const { clusterName, permissionList } = usePermissions();

  const removeAction: Action = {
    type: "CLUSTER.PERMISSIONS.SAVE",
    key: { clusterName, task: "permissionRemove" },
    payload: {
      permissionList: permissionList.filter(
        p => p.name !== permission.name || p.type !== permission.type,
      ),
    },
  };

  const edit: ModalAction = {
    onClick: () => open({ type: "update", permission }),
  };

  const remove: ModalAction = {
    confirm: {
      title: `Remove the permission "${permission.name}"?`,
      description: "Removes the permission.",
    },
    action: removeAction,
  };

  return (
    <>
      <DropdownActionListMenu
        dropdownActions={{
          edit,
          remove,
        }}
      />
    </>
  );
};
