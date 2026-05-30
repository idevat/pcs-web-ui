import type React from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "app/view/share/Modal";

import type {selectors} from "app/store";

import {TaskContextProvider} from "./TaskContext";

export const TaskSimple = ({
  close,
  task,
  footer,
  children,
  title,
  taskLabel,
  "data-test": dataTest,
}: {
  close: () => void;
  footer: React.ReactNode;
  "data-test"?: string;
  children: React.ReactNode;
  task: Parameters<typeof selectors.getTask>[0];
  taskLabel: string;
  title?: React.ReactNode;
}) => {
  return (
    <TaskContextProvider value={{task, close, taskLabel}}>
      <Modal variant="medium" isOpen onClose={close} data-test={dataTest}>
        <ModalHeader title={title ?? taskLabel} />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </Modal>
    </TaskContextProvider>
  );
};
