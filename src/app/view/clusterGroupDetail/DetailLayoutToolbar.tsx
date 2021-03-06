import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Dropdown,
  DropdownItem,
  KebabToggle,
  Modal,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";
import { push } from "connected-react-router";

import { Action } from "app/store";

import { useGroupDetailViewContext } from "./GroupDetailViewContext";

export type DetailLayoutToolbarAction = {
  confirm: {
    title: string;
    description: React.ReactNode;
  };
  action: Action;
};

type ConfirmData = DetailLayoutToolbarAction & { label: string };
type ToolbarActionMap = Record<string, DetailLayoutToolbarAction>;

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export const DetailLayoutToolbar: React.FC<{
  buttonActions?: ToolbarActionMap;
  dropdownActions?: ToolbarActionMap;
}> = ({ buttonActions = {}, dropdownActions = {} }) => {
  const dispatch = useDispatch();
  const { urlPrefix } = useGroupDetailViewContext();
  const [confirm, setConfirm] = React.useState<ConfirmData | null>(null);
  const [kebabOpen, setKebabOpen] = React.useState(false);
  const openConfirm = (confirmActions: ToolbarActionMap, name: string) => () =>
    setConfirm({
      confirm: confirmActions[name].confirm,
      action: confirmActions[name].action,
      label: capitalize(name),
    });
  const closeConfirm = () => setConfirm(null);
  return (
    <>
      <Toolbar id="group-detail-layout-detail-toolbar">
        <ToolbarContent>
          {Object.keys(buttonActions).map(name => (
            <ToolbarItem key={name}>
              <Button
                variant="secondary"
                onClick={openConfirm(buttonActions, name)}
              >
                {capitalize(name)}
              </Button>
            </ToolbarItem>
          ))}

          {dropdownActions && (
            <ToolbarItem>
              <Dropdown
                toggle={
                  <KebabToggle onToggle={() => setKebabOpen(!kebabOpen)} />
                }
                onSelect={() => setKebabOpen(false)}
                isOpen={kebabOpen}
                isPlain
                dropdownItems={Object.keys(dropdownActions).map(name => (
                  <DropdownItem
                    key={name}
                    component="button"
                    onClick={openConfirm(dropdownActions, name)}
                  >
                    {capitalize(name)}
                  </DropdownItem>
                ))}
              />
            </ToolbarItem>
          )}

          <ToolbarItem>
            <Button
              variant="plain"
              aria-label="Close panel"
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                dispatch(push(`${urlPrefix}/`));
              }}
            >
              <TimesIcon />
            </Button>
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
      {confirm && (
        <Modal
          variant="small"
          title={confirm.confirm.title}
          isOpen
          onClose={closeConfirm}
          actions={[
            <Button
              key="confirm"
              variant="primary"
              onClick={() => {
                dispatch(confirm.action);
                closeConfirm();
              }}
            >
              {confirm.label}
            </Button>,
            <Button key="cancel" variant="link" onClick={closeConfirm}>
              Cancel
            </Button>,
          ]}
        >
          {confirm.confirm.description}
        </Modal>
      )}
    </>
  );
};
