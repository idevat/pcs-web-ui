import type React from "react";
import {FormGroupLabelHelp, Popover} from "@patternfly/react-core";

type PopoverProps = React.ComponentProps<typeof Popover>;

export const AttributeHelpPopover = ({
  header,
  body,
  defaultValue = null,
}: {
  header: PopoverProps["headerContent"];
  body: PopoverProps["bodyContent"];
  defaultValue?: string | number | null;
}) => {
  return (
    <Popover
      headerContent={header}
      bodyContent={body}
      footerContent={
        defaultValue !== null && `${defaultValue}`.length > 0
          ? `Default value: ${defaultValue}`
          : null
      }
    >
      <FormGroupLabelHelp
        aria-label={typeof header === "string" ? header : ""}
      />
    </Popover>
  );
};
