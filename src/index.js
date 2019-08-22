import React from "react";
import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
// Oficial patternfly react table is a bit complex. So direct css is sometimes
// used for more lightweight components.  But styles are not loaded when
// paternfly-react Table component is not used. So, table styles are explicitly
// linked here until better way is discovered.
import "@patternfly/patternfly/components/Table/table.css";

import App from "app/core/components/App";

ReactDOM.render(<App />, document.getElementById("root"));
