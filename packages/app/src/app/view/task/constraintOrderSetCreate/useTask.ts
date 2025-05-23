import type {ActionPayload} from "app/store";
import {useResourceSets} from "app/view/share";

import {useTaskCommon} from "../useTaskCommon";

type TrueFalse = "true" | "false";

export const useTask = () => {
  const task = useTaskCommon("constraintOrderSetCreate");
  const {dispatch, state, close} = task;
  const {clusterName} = state;

  const resourceSets = useResourceSets(clusterName, task.name);

  return {
    ...task,
    clusterName,
    ...resourceSets,

    areSetsValid: resourceSets.areSetsValid(state.sets),

    isCustomIdValid: !state.useCustomId || state.id.length > 0,

    // actions
    updateState: (
      payload: ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE"],
    ) =>
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE",
        key: {clusterName},
        payload,
      }),

    updateSet:
      (index: number) =>
      (set: ActionPayload["CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET"]["set"]) => {
        dispatch({
          type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET",
          key: {clusterName},
          payload: {index, set},
        });
      },

    create: ({force}: {force: boolean}) =>
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK",
        key: {clusterName, task: task.name},
        payload: {
          taskLabel: "create constraint order set",
          call: {
            name: "constraint-order-create-with-set",
            payload: {
              constraint_options: {
                id: state.useCustomId ? state.id : undefined,
              },
              resource_set_list: state.sets.map(set => ({
                ids: set.resources,
                options: {
                  ...(set.action !== "no limitation"
                    ? {action: set.action}
                    : {}),
                  sequential: (set.sequential ? "true" : "false") as TrueFalse,
                  "require-all": (set.requireAll
                    ? "true"
                    : "false") as TrueFalse,
                },
              })),
              resource_in_clone_alowed: force,
              duplication_alowed: force,
            },
          },
        },
      }),

    close: () => {
      close();
      dispatch({
        type: "LIB.CALL.CLUSTER.TASK.CANCEL",
        key: {clusterName, task: task.name},
      });
      dispatch({
        type: "CONSTRAINT.ORDER.SET.CREATE.CLOSE",
        key: {clusterName},
      });
    },
  };
};
