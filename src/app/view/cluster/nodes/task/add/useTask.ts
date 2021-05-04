import React from "react";

import { ActionPayload } from "app/store";
import { useClusterState, useClusterTask } from "app/view/share";

export const useTask = () => {
  const task = useClusterTask("nodeAdd");
  const { clusterName, state, dispatch } = task;

  const { clusterState } = useClusterState(clusterName);

  const checkCanAddNode = () =>
    dispatch({
      type: "NODE.ADD.CHECK_CAN_ADD",
      key: { clusterName },
      payload: {
        nodeName: state.nodeName,
      },
    });

  const useNodeCheck = () => {
    React.useEffect(() => {
      if (state.nodeCheck === "not-started") {
        checkCanAddNode();
      }
    });
  };

  const filledSbdDevices = state.sbdDevices.filter(a => a.length > 0);
  const filledNodeAddresses = Object.values(state.nodeAddresses).filter(
    a => a.length > 0,
  );

  return {
    ...task,

    filledSbdDevices,

    filledNodeAddresses,

    isNameValid: state.nodeName.length > 0,

    isNodeCheckDoneValid: state.nodeCheck === "success",

    isSbdEnabled:
      clusterState.sbdDetection !== null && clusterState.sbdDetection.enabled,

    // actions
    close: () => {
      task.close();
      dispatch({
        type: "NODE.ADD.CLOSE",
        key: { clusterName },
      });
    },

    updateState: (payload: ActionPayload["NODE.ADD.UPDATE"]) =>
      dispatch({
        type: "NODE.ADD.UPDATE",
        key: { clusterName },
        payload,
      }),

    updateNodeName: (nodeName: string) =>
      dispatch({
        type: "NODE.ADD.UPDATE_NODE_NAME",
        key: { clusterName },
        payload: {
          nodeName,
        },
      }),

    checkAuth: () =>
      dispatch({
        type: "NODE.ADD.CHECK_AUTH",
        key: { clusterName },
        payload: {
          nodeName: state.nodeName,
        },
      }),

    nodeAdd: () =>
      dispatch({
        type: "NODE.ADD",
        key: { clusterName },
        payload: {
          nodeName: state.nodeName,
          sbdWatchdog: state.sbdWatchdog,
          sbdDevices: filledSbdDevices,
          sbdNoWatchdogValidation: state.sbdNoWatchdogValidation,
          nodeAddresses: filledNodeAddresses,
        },
      }),

    nodeStart: () =>
      dispatch({
        type: "NODE.START",
        key: { clusterName },
        payload: { nodeName: state.nodeName },
      }),

    sendKnownHosts: () =>
      dispatch({
        type: "NODE.ADD.SEND_KNOWN_HOSTS",
        key: { clusterName },
        payload: { nodeName: state.nodeName },
      }),

    checkCanAddNode,

    useNodeCheck,
  };
};