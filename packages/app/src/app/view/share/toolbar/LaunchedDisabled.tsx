import {Button} from "@patternfly/react-core";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "app/view/share/Modal";

import type {LauncherItem} from "./types";

export const LaunchedDisabled = ({
  item,
  close,
}: {
  item: LauncherItem;
  close: () => void;
}) => {
  return (
    <Modal variant="small" isOpen onClose={close}>
      <ModalHeader title={item.launchDisable?.title || "Launch disabled"} />
      <ModalBody>{item.launchDisable?.message || "Launch disabled"}</ModalBody>
      <ModalFooter>
        <Button variant="primary" onClick={close}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
