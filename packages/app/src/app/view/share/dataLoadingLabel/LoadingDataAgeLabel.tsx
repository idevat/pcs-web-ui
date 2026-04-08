import React from "react";
import {SyncAltIcon} from "@patternfly/react-icons";

import {LoadingLabel} from "./LoadingLabel";
import {age, ageLabel} from "./ageLabel";

export const LoadingDataAgeLabel = (props: {
  onClick: () => void;
  when: number;
}) => {
  const [refreshHovered, setRefreshHovered] = React.useState(false);
  const [ageSeconds, setAgeSecons] = React.useState(age(props.when));

  React.useEffect(() => {
    setAgeSecons(age(props.when));
    const interval = setInterval(() => setAgeSecons(age(props.when)), 5000);
    return () => {
      clearInterval(interval);
    };
  }, [props.when]);

  return (
    <LoadingLabel
      variant={refreshHovered ? "filled" : "outline"}
      icon={<SyncAltIcon />}
      onClick={props.onClick}
      onMouseEnter={() => setRefreshHovered(true)}
      onMouseLeave={() => setRefreshHovered(false)}
      style={{cursor: "pointer"}}
    >
      {`updated ${ageLabel(ageSeconds)}`}
    </LoadingLabel>
  );
};
