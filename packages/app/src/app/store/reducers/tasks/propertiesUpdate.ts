import type {AppReducer} from "app/store/reducers/appReducer";

const initialState: {
  clusterName: string;
  propertyMap: Record<string, string>;
  response: "" | "sending" | "ok" | "fail";
  resultMessage: string;
} = {
  clusterName: "",
  propertyMap: {},
  response: "",
  resultMessage: "",
};

export const propertiesUpdate: AppReducer<typeof initialState> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case "CLUSTER.PROPERTIES.UPDATE.INIT":
      return {
        ...state,
        clusterName: action.payload.clusterName,
        propertyMap: action.payload.propertyMap,
      };
    case "CLUSTER.PROPERTIES.UPDATE":
      return {
        ...state,
        propertyMap: action.payload.propertyMap,
      };
    case "CLUSTER.PROPERTIES.UPDATE.CLOSE":
      return initialState;
    case "CLUSTER.PROPERTIES.UPDATE.OK":
      return {
        ...state,
        response: "ok",
        resultMessage: "",
      };
    case "CLUSTER.PROPERTIES.UPDATE.FAIL":
      return {
        ...state,
        response: "fail",
        resultMessage: action.payload.message,
      };
    default:
      return state;
  }
};
