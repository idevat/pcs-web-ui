import type {ClusterAddActions} from "./add";
import type {ClusterStaticInfoActions} from "./staticInfo";
import type {ClusterFixAuthActions} from "./fixAuth";
import type {ClusterPermissionsActions} from "./permissions";
import type {ClusterPropertiesActions} from "./properties";
import type {ClusterSbdActions} from "./sbd";
import type {ClusterStatusActions} from "./status";
import type {ClusterTaskActions} from "./task";
import type {ClusterNVPairListActions} from "./nvpairList";
import type {ClusterAclActions} from "./acl";
import type {ClusterStopActions} from "./stop";
import type {ClusterStartActions} from "./start";
import type {ClusterSetupActions} from "./setup";
import type {ClusterDestroyActions} from "./destroy";

// biome-ignore format: this is better formating
export type ClusterActions = (
  & ClusterAclActions
  & ClusterAddActions
  & ClusterDestroyActions
  & ClusterFixAuthActions
  & ClusterPermissionsActions
  & ClusterPropertiesActions
  & ClusterSbdActions
  & ClusterSetupActions
  & ClusterStartActions
  & ClusterStaticInfoActions
  & ClusterStatusActions
  & ClusterStopActions
  & ClusterTaskActions
  & ClusterNVPairListActions
);
