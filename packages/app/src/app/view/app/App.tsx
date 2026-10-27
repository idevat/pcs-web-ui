import {Provider} from "react-redux";

import {setupStore} from "app/store";
import {Router} from "app/view/share";
import {TaskContainer} from "app/view/task";
import {ClusterApp} from "app/view/cluster";

import {EnsureLogin} from "./login";
import {EnsurePermissions} from "./EnsurePermissions";
import "./App.css";

export const App = ({
  store = setupStore(),
}: {
  store?: ReturnType<typeof setupStore>;
}) => (
  <Provider store={store}>
    <EnsureLogin>
      <EnsurePermissions>
        <Router base="/ui">
          <TaskContainer />
          <ClusterApp />
        </Router>
      </EnsurePermissions>
    </EnsureLogin>
  </Provider>
);
