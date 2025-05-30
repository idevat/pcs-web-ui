import ReactDOM from "react-dom/client";
import "@patternfly/react-core/dist/styles/base.css";
// Official patternfly react table is a bit complex. So direct css is sometimes
// used for more lightweight components.  But styles are not loaded when
// paternfly-react Table component is not used. So, table styles are explicitly
// linked here until better way is discovered.
import "@patternfly/patternfly/layouts/Split/split.css";
import "@patternfly/patternfly/components/Table/table.css";
import "@patternfly/patternfly/components/Table/table-grid.css";
import "@patternfly/react-styles/css/layouts/Flex/flex.css";
import "@patternfly/react-styles/css/utilities/Flex/flex.css";
import "@patternfly/react-styles/css/utilities/Spacing/spacing.css";
import "@patternfly/react-styles/css/utilities/Sizing/sizing.css";
import "@patternfly/react-styles/css/components/Alert/alert-group.css";
import "@patternfly/react-styles/css/components/Card/card.css";
import "@patternfly/react-styles/css/components/Content/content.css";
import "@patternfly/react-styles/css/components/Radio/radio.css";
import "@patternfly/react-styles/css/components/Select/select.css";

import {App} from "app/view";
import * as colorScheme from "app/view/colorScheme";

colorScheme.setup();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />,
);
