import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

import {launchClusterItemAction} from "./common";

const clusterName = "test-cluster";
const clusterStatus = cs.cluster(clusterName, "ok");

const mockWithDashboard = (routeList: mock.Route[] = []) => {
  mock.shortcuts.withDashboard({
    clusterStatus,
    routeList,
  });
};

const launchStart = async () => {
  await goToDashboard();
  await launchClusterItemAction(clusterName, a => a.start);
};

describe("Cluster destroy", () => {
  afterEach(mock.stop);

  it("should be successfully destroyed", async () => {
    mockWithDashboard([mock.route.clusterStart({clusterName})]);

    await launchStart();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.success);
  });

  it("should be cancelable", async () => {
    mockWithDashboard();

    await launchStart();
    await click(marks.task.confirm.cancel);
    await isAbsent(marks.task.confirm);
  });

  it("should deal with an error", async () => {
    mockWithDashboard([
      mock.route.clusterStart({clusterName, response: {status: 400}}),
    ]);

    await launchStart();
    await click(marks.task.confirm.run);
    await isVisible(marks.notifications.toast.error);
  });
});
