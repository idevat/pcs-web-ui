import { failMessage, isUnauthorizedError } from "./errors";
import { getForText, postForText } from "./calls";
import {
  ApiCall as ApiCallType,
  ApiResponse as ApiResponseType,
  ApiResult as ApiResultType,
} from "./tools";
import * as types from "./types";

export { failMessage, isUnauthorizedError, getForText, postForText };
export type ApiResponse<T> = ApiResponseType<T>;
export type ApiResult<T> = ApiResultType<T>;
export type ApiCall<T> = ApiCallType<T>;

export { types };
export * from "./api";
