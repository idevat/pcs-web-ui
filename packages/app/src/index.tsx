import ReactDOM from "react-dom/client";
import "@patternfly/react-core/dist/styles/base.css";
import "@patternfly/react-styles/css/utilities/Flex/flex.css";
import "@patternfly/react-styles/css/utilities/Spacing/spacing.css";
import "@patternfly/react-styles/css/utilities/Sizing/sizing.css";

import {App} from "app/view";
import * as colorScheme from "app/view/colorScheme";

colorScheme.setup();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
