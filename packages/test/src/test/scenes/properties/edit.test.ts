import {mock} from "test/tools";
import * as t from "dev/responses/clusterStatus/tools";

const clusterStatus = t.cluster("test-cluster");
const goToProperties = async () => {
  await goToCluster(clusterStatus.cluster_name, tabs => tabs.properties);
};

describe("Cluster properties edit", () => {
  afterEach(mock.stop);
  it("should be sucessfully edited", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [mock.route.sbdDisable(clusterStatus.cluster_name)],
    });
    await goToProperties();
    await click(marks.cluster.propertiesToolbar.edit);
    await page.waitForTimeout(3000);
    expect(1).toEqual(2);
  });
});
