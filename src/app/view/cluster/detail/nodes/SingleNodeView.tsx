import {Icon} from "@patternfly/react-core";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  QuestionCircleIcon,
} from "@patternfly/react-icons";

import {Link, location, useSelectedClusterName} from "app/view/share";
import {Node} from "app/view/cluster/types";

export const SingleNodeView = ({singleNode}: {singleNode: Node}) => {
  const clusterName = useSelectedClusterName();
  const nodeNameLink = (
    <Link
      isInline
      strong
      to={location.node({clusterName, nodeName: singleNode.name})}
    >
      {singleNode.name}
    </Link>
  );
  return (
    <>
      <div className="pf-u-mb-md">This is single node cluster.</div>
      <div>
        {singleNode.status !== "DATA_NOT_PROVIDED" && (
          <>
            <Icon
              isInline
              status={singleNode.status === "ONLINE" ? "success" : "warning"}
            >
              {singleNode.status === "ONLINE" && <CheckCircleIcon />}
              {singleNode.status !== "ONLINE" && <ExclamationTriangleIcon />}
            </Icon>{" "}
            {nodeNameLink} is {singleNode.status.toLowerCase()}.
          </>
        )}
        {singleNode.status === "DATA_NOT_PROVIDED" && (
          <>
            <Icon status="warning">
              <QuestionCircleIcon />
            </Icon>{" "}
            {nodeNameLink} is unreachable
          </>
        )}
      </div>
    </>
  );
};
