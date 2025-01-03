import {assert} from "test/tools";

const testTimeout = parseInt(process.env.PCS_WUI_TEST_TIMEOUT ?? "70000", 10);
const username = process.env.PCSD_USERNAME_1 ?? "";
const password = process.env.PCSD_PASSWORD_1 ?? "";
const nodeName = process.env.PCSD_NODE_1 || "";

const clusterName = "test-cluster";

const {clusterList} = marks.dashboard;

const waitForImportedClusterList = async () =>
  await page.waitForResponse(/.*\/imported-cluster-list$/, {timeout: 50000});

const expectImportedClusterNamesAre = async (nameList: string[]) => {
  await assert.expectKeysAre(clusterList.cluster.name, nameList);
};

export const launchClusterItemAction = async (
  clusterName: string,
  search: (c: typeof clusterList.cluster.actions) => Mark,
) => {
  await click(
    item.byName(clusterList.cluster, clusterName, [
      c => c.actions,
      c => search(c.actions),
    ]),
  );
};

const {task} = marks;

describe("Web ui on one node cluster", () => {
  it(
    "should succeed with essential features",
    async () => {
      await goToDashboard();
      await login(username, password);

      console.log("* Login success");
      await isVisible(clusterList);
      // we expect to start with no cluster
      await expectImportedClusterNamesAre([]);
      console.log("* No cluster");

      await click(marks.dashboardToolbar.setupCluster);
      console.log("* Setup cluster clicked");
      await setupCluster(clusterName, nodeName);
      console.log("* Setup cluster success");
      await expectImportedClusterNamesAre([clusterName]);
      console.log("* New cluster here");

      await removeCluster(clusterName);
      await expectImportedClusterNamesAre([]);
      console.log("* Cluster out of webui");

      await click(marks.dashboardToolbar.importExistingCluster);
      await importExistingCluster(nodeName);
      await expectImportedClusterNamesAre([clusterName]);
      console.log("* Cluster back in webui");

      await isVisible(
        marks.dashboard.clusterList.cluster.status.locator.locator(
          'xpath=//*[text() = "inoperative" or text() = "running"]',
        ),
      );

      await destroyCluster(clusterName);
      await expectImportedClusterNamesAre([]);
    },
    testTimeout,
  );
});

const importExistingCluster = async (nodeName: string) => {
  await isVisible(task.clusterImportExisting);

  const {nodeNameFooter, prepareNode, prepareNodeFooter, success} =
    task.clusterImportExisting;

  await fill(task.clusterImportExisting.nodeName, nodeName);
  await click(nodeNameFooter.checkAuthentication);
  await isVisible(prepareNode.success);

  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/cluster_status$/),
    await click(prepareNodeFooter.addExistringCluster),
  ]);
  await isVisible(success);
  await click(success.close);
};

const removeCluster = async (clusterName: string) => {
  await launchClusterItemAction(clusterName, a => a.remove);
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/manage\/removecluster$/),
    isVisible(marks.notifications.toast.success),
    appConfirm.run(`Remove the cluster "${clusterName}"?`),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const destroyCluster = async (clusterName: string) => {
  await launchClusterItemAction(clusterName, a => a.destroy);
  const {success} = marks.notifications.toast;
  await Promise.all([
    waitForImportedClusterList(),
    page.waitForResponse(/.*\/managec\/.*\/cluster_destroy$/),
    isVisible(success.locator.getByText("Cluster removed from cluster list")),
    isVisible(success.locator.getByText("Cluster destroyed.")),
    appConfirm.run(`Destroy the cluster "${clusterName}"?`),
  ]);
  // give page chance to redraw after loading imported-cluster-list
  await page.waitForTimeout(100);
};

const setupCluster = async (clusterName: string, oneNode: string) => {
  await isVisible(task.clusterSetup);

  console.log("* Wizard visible");
  await fill(task.clusterSetup.nameAndNodes.clusterName, clusterName);
  console.log("* Name filled");
  await fill(task.clusterSetup.nameAndNodes.node.name.locator.nth(0), oneNode);
  console.log("* Node filled");
  await click(task.clusterSetup.nameAndNodesFooter.next);
  console.log("* Next to review clicked");
  await click(task.clusterSetup.prepareNodesFooter.reviewAndFinish);
  console.log("* Review and finish clicked");
  // Task moves to next stage after imported-cluster-list response is done. The
  // request imported-cluster-list is run immediatelly after cluster setup
  // backend call is done.
  //await Promise.all([
  //  waitForImportedClusterList(),
  //  click(task.clusterSetup.reviewFooter.next),
  //]);

  await waitForImportedClusterList(),
  console.log("* imported-cluster-list is here");
  await click(task.clusterSetup.reviewFooter.next),
  console.log("* Promises resolved");

  await isVisible(task.clusterSetup.success);
  console.log("* Success page visible");
  await click(task.clusterSetup.success.startAndClose);
  console.log("* Start and close clicked");
};
