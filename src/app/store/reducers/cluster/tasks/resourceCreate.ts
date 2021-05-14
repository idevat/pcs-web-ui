import { AppReducer } from "app/store/reducers/appReducer";

import { libCallFactory } from "./libCall";

type InstanceAttrName = string;
type InstanceAttrValue = string;
type InstanceAttrs = Record<InstanceAttrName, InstanceAttrValue>;

const {
  libCall,
  initialState: initalLibCall,
  update: updateLibCall,
} = libCallFactory();

const initialState: {
  agentName: string;
  resourceName: string;
  instanceAttrs: InstanceAttrs;
  libCall: typeof initalLibCall;
  showValidationErrors: boolean;
  clone: boolean;
  promotable: boolean;
  disabled: boolean;
  useGroup: "no" | "existing" | "new";
  group: string;
} = {
  resourceName: "",
  agentName: "",
  libCall: initalLibCall,
  instanceAttrs: {},
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

export const resourceCreate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "RESOURCE.CREATE.UPDATE": {
      return {
        ...state,
        ...action.payload,
        instanceAttrs: instanceAttrs(
          state.instanceAttrs,
          action.payload.instanceAttrs || {},
        ),
      };
    }
    case "RESOURCE.CREATE":
      return {
        ...state,
        libCall: updateLibCall(state.libCall, { response: "no-response" }),
      };
    case "RESOURCE.CREATE.CLOSE":
      return initialState;
    case "CLUSTER.TASK.VALIDATION.SHOW":
      return { ...state, showValidationErrors: true };
    case "CLUSTER.TASK.VALIDATION.HIDE":
      return { ...state, showValidationErrors: false };
    default:
      return { ...state, libCall: libCall(state.libCall, action) };
  }
};
