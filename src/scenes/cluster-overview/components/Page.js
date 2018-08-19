import React from 'react';

import ClusterOverview from "./ClusterOverview.js"
import ClusterTopMenu from "../../../components/cluster/TopMenu.js"
import ClusterPageContent from "../../../components/cluster/PageContent.js"

export default ({cluster, match}) => (
  <React.Fragment>

    <ClusterTopMenu clusterName={cluster.name}/>

    <ClusterPageContent
      clusterUrlId={match.params.name}
      clusterName={cluster.name}
      activeMenu="overview"
    >
      <ClusterOverview cluster={cluster}/>
    </ClusterPageContent>

  </React.Fragment>
);
