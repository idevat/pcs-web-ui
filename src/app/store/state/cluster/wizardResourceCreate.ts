import { api } from "app/backend";
import { Reducer } from "app/store/redux";

type InstanceAttrName = string;
type InstanceAttrValue = string;
type InstanceAttrs = Record<InstanceAttrName, InstanceAttrValue>;

export type Report = api.types.libraryResponse.ApiReport;
export type WizardResourceCreate = {
  agentName: string;
  resourceName: string;
  instanceAttrs: InstanceAttrs;
  response:
    | "no-response"
    | "success"
    | "forceable-fail"
    | "fail"
    | "communication-error";
  reports: Report[];
  showValidationErrors: boolean;
  clone: boolean;
  promotable: boolean;
  disabled: boolean;
  useGroup: "no" | "existing" | "new";
  group: string;
};

const initialState: WizardResourceCreate = {
  resourceName: "",
  agentName: "",
  response: "no-response",
  instanceAttrs: {},
  reports: [],
  showValidationErrors: false,
  clone: false,
  promotable: false,
  disabled: false,
  useGroup: "no",
  group: "",
};

const instanceAttrs = (stateAttrs: InstanceAttrs, actionAttrs: InstanceAttrs) =>
  Object.keys(actionAttrs).reduce((attrs, name) => {
    if (actionAttrs[name].length > 0) {
      return { ...attrs, [name]: actionAttrs[name] };
    }
    const { [name]: _, ...rest } = stateAttrs;
    return rest;
  }, stateAttrs);

const wizardResourceCreate: Reducer<WizardResourceCreate> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.PRIMITIVE.CREATE.UPDATE": {
      return {
        ...state,
        ...action.payload.state,
        instanceAttrs: instanceAttrs(
          state.instanceAttrs,
          action.payload.state.instanceAttrs || {},
        ),
      };
    }
    case "RESOURCE.PRIMITIVE.CREATE":
      return { ...state, response: "no-response" };
    case "RESOURCE.PRIMITIVE.CREATE.SUCCESS":
      return { ...state, response: "success", reports: action.payload.reports };
    case "RESOURCE.PRIMITIVE.CREATE.FAILED":
      return { ...state, response: "fail", reports: action.payload.reports };
    case "RESOURCE.PRIMITIVE.CREATE.ERROR":
      return { ...state, response: "communication-error" };
    case "RESOURCE.PRIMITIVE.CREATE.CLOSE":
      return initialState;
    case "RESOURCE.PRIMITIVE.CREATE.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };
    case "RESOURCE.PRIMITIVE.CREATE.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };
    default:
      return state;
  }
};

export default wizardResourceCreate;
