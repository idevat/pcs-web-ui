import type React from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "app/view/share/Modal";

import type {selectors} from "app/store";

import {TaskResultLib} from "./TaskResultLib";
import {TaskContextProvider} from "./TaskContext";

type TaskResultProps = React.ComponentProps<typeof TaskResultLib>;
type TaskContextProps = React.ComponentProps<typeof TaskContextProvider>;

export const TaskSimpleLib = (props: {
  close: TaskContextProps["value"]["close"];
  task: Parameters<typeof selectors.getTask>[0];
  taskLabel: TaskContextProps["value"]["taskLabel"];

  footer: React.ReactNode;
  configure: React.ReactNode;

  response: TaskResultProps["response"];
  success: TaskResultProps["success"];
  unsuccess: TaskResultProps["unsuccess"];
  communicationError: TaskResultProps["communicationError"];
  reports: TaskResultProps["reports"];

  title?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <TaskContextProvider
      value={{
        task: props.task,
        close: props.close,
        taskLabel: props.taskLabel,
      }}
    >
      <Modal
        variant="medium"
        isOpen
        onClose={props.close}
        data-test={props["data-test"]}
      >
        <ModalHeader title={props.title ?? props.taskLabel} />
        <ModalBody>
          {props.response === "no-response" && props.configure}
          {props.response !== "no-response" && (
            <TaskResultLib
              response={props.response}
              success={props.success}
              unsuccess={props.unsuccess}
              communicationError={props.communicationError}
              reports={props.reports}
            />
          )}
        </ModalBody>
        {props.response === "no-response" && (
          <ModalFooter>{props.footer}</ModalFooter>
        )}
      </Modal>
    </TaskContextProvider>
  );
};
