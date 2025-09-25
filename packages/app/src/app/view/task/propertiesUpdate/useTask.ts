import {useTaskCommon} from "../useTaskCommon";

export const useTask = () => {
  const task = useTaskCommon("propertiesUpdate");

  const {
    state: {clusterName, propertyMap},
    dispatch,
  } = task;

  return {
    ...task,
    clusterName,

    propertiesUpdate: () => {
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE",
        key: {clusterName},
        payload: {propertyMap},
      });
    },

    close: () => {
      dispatch({
        type: "CLUSTER.PROPERTIES.UPDATE.CLOSE",
        key: {clusterName},
      });
      task.close();
    },
  };
};
