import type React from "react";
import {Content, StackItem, Title} from "@patternfly/react-core";

export const DetailViewSection = ({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
}) => {
  return (
    <StackItem className="pf-v5-u-mb-xl">
      {caption && (
        <Content>
          <Title headingLevel={"h2"}>{caption}</Title>
        </Content>
      )}
      {children}
    </StackItem>
  );
};
