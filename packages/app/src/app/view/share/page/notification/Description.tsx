import {Content, List, ListItem} from "@patternfly/react-core";

import type {Notification} from "./types";

export const Description = ({details}: {details: Notification["details"]}) => {
  return (
    <>
      {details && details.type === "LIST" && details.items.length > 0 && (
        <>
          <Content component="p">{details.title}</Content>
          <List>
            {details.items.map((item, i) => (
              <ListItem key={i}>{item}</ListItem>
            ))}
          </List>
        </>
      )}
      {details &&
        details.type === "LINES" &&
        details.lines.map((line, i) => <p key={i}>{line}</p>)}
    </>
  );
};
