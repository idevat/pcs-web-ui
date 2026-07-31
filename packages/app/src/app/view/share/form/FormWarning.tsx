import type React from "react";
import {
  FormHelperText,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import {ExclamationTriangleIcon} from "@patternfly/react-icons";

export const FormWarning = (props: {warningText: React.ReactNode}) => {
  return (
    <FormHelperText>
      <HelperText>
        <HelperTextItem icon={<ExclamationTriangleIcon />} variant="warning">
          {props.warningText}
        </HelperTextItem>
      </HelperText>
    </FormHelperText>
  );
};
