import {
  DescriptionListDescription,
  Label,
  Spinner,
} from "@patternfly/react-core";
import {LockIcon} from "@patternfly/react-icons";

export const isCibSecret = (value: string | undefined): boolean =>
  value === "lrm://";

export const AttributeValueSecret = ({
  "data-test": dataTest,
  isLoading,
}: {
  "data-test"?: string;
  isLoading?: boolean;
}) => {
  return (
    <DescriptionListDescription>
      <Label color="gold" icon={<LockIcon />} isCompact data-test={dataTest}>
        CIB secret{isLoading && <Spinner size="sm" />}
      </Label>
    </DescriptionListDescription>
  );
};
