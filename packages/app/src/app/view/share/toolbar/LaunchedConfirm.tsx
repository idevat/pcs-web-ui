import {useDispatch} from "react-redux";
import {Button} from "@patternfly/react-core";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "app/view/share/Modal";

import {testMarks} from "app/view/dataTest";
import {tools} from "app/store";

import type {LauncherItem} from "./types";

const {labelize} = tools;

const {task} = testMarks;

export const LaunchedConfirm = ({
  item,
  closeConfirm,
}: {
  item: Extract<LauncherItem, {confirm: unknown}>;
  closeConfirm: () => void;
}) => {
  const dispatch = useDispatch();
  const {confirm} = item;
  const run = "run" in confirm ? confirm.run : () => dispatch(confirm.action);
  return (
    <Modal variant="small" isOpen onClose={closeConfirm} {...task.confirm.mark}>
      <ModalHeader
        title={confirm.title}
        titleIconVariant={confirm.titleVariant}
      />
      <ModalBody>
        <span {...task.confirm.description.mark}>{confirm.description}</span>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="primary"
          onClick={() => {
            run();
            closeConfirm();
          }}
          {...task.confirm.run.mark}
        >
          {labelize(confirm.label ?? item.label ?? item.name)}
        </Button>
        <Button
          variant="link"
          onClick={closeConfirm}
          {...task.confirm.cancel.mark}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
