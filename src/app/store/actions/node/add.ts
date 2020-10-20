export type Update = {
  type: "NODE.ADD.UPDATE";
  payload: {
    clusterUrlName: string;
    state: {
      nodeName?: string;
      nodeAddresses?: {
        address1: string;
        address2: string;
        address3: string;
        address4: string;
        address5: string;
        address6: string;
        address7: string;
        address8: string;
      };
    };
  };
};

export type CheckCanAdd = {
  type: "NODE.ADD.CHECK_CAN_ADD";
  payload: {
    clusterUrlName: string;
    nodeName: string;
  };
};

export type CheckCanAddFailed = {
  type: "NODE.ADD.CHECK_CAN_ADD.FAILED";
  payload: {
    clusterUrlName: string;
    message: string;
  };
};

export type CheckAuth = {
  type: "NODE.ADD.CHECK_AUTH";
  payload: {
    clusterUrlName: string;
    nodeName: string;
  };
};

export type CheckAuthFailed = {
  type: "NODE.ADD.CHECK_AUTH.FAILED";
  payload: {
    clusterUrlName: string;
  };
};

export type CheckAuthSuccess = {
  type: "NODE.ADD.CHECK_AUTH.SUCCESS";
  payload: {
    clusterUrlName: string;
  };
};
