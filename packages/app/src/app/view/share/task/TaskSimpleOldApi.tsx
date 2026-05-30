import type React from "react";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "app/view/share/Modal";

import type {selectors} from "app/store";

import {TaskContextProvider} from "./TaskContext";
import {TaskProgress} from "./TaskProgress";

type TaskContextProps = React.ComponentProps<typeof TaskContextProvider>;

export const TaskSimpleOldApi = (props: {
  close: TaskContextProps["value"]["close"];
  task: Parameters<typeof selectors.getTask>[0];
  taskLabel: TaskContextProps["value"]["taskLabel"];

  footer: React.ReactNode;
  configure: React.ReactNode;

  response: "" | "sending" | "ok" | "fail";
  waitTitle: React.ReactNode;
  success: React.ReactNode;
  fail: React.ReactNode;

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
          {props.response === "" && props.configure}
          {props.response === "sending" && (
            <TaskProgress title={props.waitTitle} />
          )}
          {props.response === "ok" && props.success}
          {props.response === "fail" && props.fail}
        </ModalBody>
        {props.response === "" && <ModalFooter>{props.footer}</ModalFooter>}
      </Modal>
    </TaskContextProvider>
  );
};
