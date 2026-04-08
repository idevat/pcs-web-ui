import {DescriptionListDescription, Label} from "@patternfly/react-core";
import {UnlockIcon} from "@patternfly/react-icons";

export const AttributeValueSecretRevealed = ({
  value,
  "data-test": dataTest,
}: {
  value: string;
  "data-test"?: string;
}) => {
  return (
    <DescriptionListDescription>
      <Label color="gold" icon={<UnlockIcon />} isCompact data-test={dataTest}>
        {value}
      </Label>
    </DescriptionListDescription>
  );
};
