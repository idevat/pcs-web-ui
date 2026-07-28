import type React from "react";
import {Switch as PfSwitch} from "@patternfly/react-core";

export const Switch = (props: {
  "aria-label"?: string;
  id?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  labelOff?: React.ReactNode;
  label?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  "data-test"?: string;
}) => {
  const {onChange} = props;
  return (
    <span data-test={props["data-test"]}>
      <PfSwitch
        aria-label={props["aria-label"]}
        id={props.id}
        isChecked={props.isChecked}
        isDisabled={props.isDisabled}
        label={
          !props.isChecked && props.labelOff !== undefined
            ? props.labelOff
            : props.label
        }
        onChange={onChange ? (_event, checked) => onChange(checked) : onChange}
      />
    </span>
  );
};
