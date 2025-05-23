import type {AppReducer} from "app/store/reducers/appReducer";
import type {ActionPayload} from "app/store/actions";

type InitPayload = ActionPayload["RESOURCE.GROUP.CHANGE.INIT"];
const initialState: Required<ActionPayload["RESOURCE.GROUP.CHANGE.UPDATE"]> & {
  clusterName: string;
  groupIdStructureList: InitPayload["groupIdStructureList"];
  showValidationErrors: boolean;
  call: {
    response: "" | "sending" | "ok" | "fail";
    resultMessage: string;
  };
} = {
  clusterName: "",
  groupIdStructureList: [],
  action: "remove-group",
  resourceId: "",
  groupId: "",
  oldGroupId: "",
  position: "after",
  adjacentResourceId: "",
  call: {
    response: "",
    resultMessage: "",
  },
  showValidationErrors: false,
};

export const primitiveGroupChange: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.GROUP.CHANGE.INIT":
      return {
        ...state,
        ...action.payload,
        clusterName: action.payload.clusterName,
        groupIdStructureList: action.payload.groupIdStructureList,
        ...(action.payload?.action === "set-group"
          ? {
              groupId: "",
              adjacentResourceId: "",
            }
          : {}),
        ...(action.payload?.action === "move-in-group"
          ? {
              groupId: action.payload?.oldGroupId ?? state.oldGroupId,
              adjacentResourceId: "",
            }
          : {}),
      };

    case "TASK.VALIDATION.SHOW":
      return {...state, showValidationErrors: true};

    case "TASK.VALIDATION.HIDE":
      return {...state, showValidationErrors: false};

    case "RESOURCE.GROUP.CHANGE.UPDATE":
      return {
        ...state,
        ...action.payload,
        ...(action.payload?.action === "set-group"
          ? {
              groupId: "",
              adjacentResourceId: "",
            }
          : {}),
        ...(action.payload?.action === "move-in-group"
          ? {
              groupId: action.payload?.oldGroupId ?? state.oldGroupId,
              adjacentResourceId: "",
            }
          : {}),
      };

    case "RESOURCE.GROUP.CHANGE":
      return {
        ...state,
        call: {
          response: "sending",
          resultMessage: "",
        },
      };

    case "RESOURCE.GROUP.CHANGE.OK":
      return {
        ...state,
        call: {
          response: "ok",
          resultMessage: "",
        },
      };

    case "RESOURCE.GROUP.CHANGE.FAIL":
      return {
        ...state,
        call: {
          response: "fail",
          resultMessage: action.payload.message,
        },
      };

    case "RESOURCE.GROUP.CHANGE.FAIL.RECOVER":
      return {
        ...state,
        call: {
          response: "",
          resultMessage: "",
        },
      };

    case "RESOURCE.GROUP.CHANGE.CLOSE":
      return initialState;

    default:
      return state;
  }
};
