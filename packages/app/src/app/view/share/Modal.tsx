import type React from "react";
import {forwardRef} from "react";
import {
  Modal as PfModal,
  ModalBody as PfModalBody,
  ModalFooter as PfModalFooter,
  ModalHeader as PfModalHeader,
} from "@patternfly/react-core";

type ModalProps = Omit<React.ComponentProps<typeof PfModal>, "ref">;

const {topModal} = pcsUiEnvAdapter;

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  return (
    <PfModal
      position={topModal ? "top" : "default"}
      {...props}
      // biome-ignore lint/suspicious/noExplicitAny: no worth to improve any now
      ref={ref as any}
    />
  );
});

export const ModalHeader = PfModalHeader;
export const ModalBody = PfModalBody;
export const ModalFooter = PfModalFooter;
