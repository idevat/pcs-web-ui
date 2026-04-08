import React from "react";
import {Popover, Switch} from "@patternfly/react-core";
import {QuestionCircleIcon} from "@patternfly/react-icons";
import {global_disabled_color_100 as helpColor} from "@patternfly/react-tokens";

import {testMarks} from "app/view/dataTest";
import {age, ageLabel} from "app/view/share";

const {attributes} = testMarks.cluster.resources.currentPrimitive;

export const CibSecretsToggle = ({
  id,
  cibSecretsState,
  onChange,
}: {
  id: string;
  cibSecretsState:
    | {
        loadStatus: "LOADING" | "LOADED" | "FAILED";
        when: number | null;
      }
    | undefined;
  onChange: (checked: boolean) => void;
}) => {
  const [ageSeconds, setAgeSeconds] = React.useState(0);

  React.useEffect(() => {
    if (
      cibSecretsState?.loadStatus !== "LOADED" ||
      cibSecretsState.when === null
    ) {
      return;
    }
    const when = cibSecretsState.when;
    setAgeSeconds(age(when));
    const interval = setInterval(() => setAgeSeconds(age(when)), 5000);
    return () => clearInterval(interval);
  }, [cibSecretsState?.loadStatus, cibSecretsState?.when]);

  return (
    <>
      <Switch
        id={id}
        label="Reveal secrets"
        isChecked={cibSecretsState?.loadStatus === "LOADED"}
        isDisabled={cibSecretsState?.loadStatus === "LOADING"}
        onChange={(_event, checked) => onChange(checked)}
        {...attributes.secretsToggle.mark}
      />
      {cibSecretsState?.loadStatus === "LOADED" &&
        cibSecretsState.when !== null && (
          <Popover
            bodyContent={
              <>
                <div>{`Loaded ${ageLabel(ageSeconds)}.`}</div>
                Secret values are loaded once when revealed. To get fresh
                values, hide and reveal secrets again.
              </>
            }
          >
            <QuestionCircleIcon color={helpColor.var} />
          </Popover>
        )}
    </>
  );
};
