import type React from "react";
import {Card, CardBody, CardHeader, Content} from "@patternfly/react-core";

import {Table} from "app/view/share";

export const NodeServiceCard = ({
  label,
  children,
}: React.PropsWithChildren<{
  label: string;
}>) => {
  const flagList = Array.isArray(children) ? children : [children];
  return (
    <Card>
      <CardHeader>
        <Content component="h2"> {label}</Content>
      </CardHeader>
      <CardBody>
        <Table isCompact isBorderless>
          <Table.Body>
            {flagList.map((flag, i) => (
              <tr key={i}>
                <td>{flag}</td>
              </tr>
            ))}
          </Table.Body>
        </Table>
      </CardBody>
    </Card>
  );
};
