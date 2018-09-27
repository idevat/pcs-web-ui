import { call, put, takeEvery } from "redux-saga/effects";
import { delay } from "redux-saga";

import * as actions from "./actions";
import * as types from "./constants";

const DEFAULT_TTL = 300;

function* planClosing({ payload: { id: notificationId, disappear: ttl } }) {
  if (!ttl) {
    return;
  }
  const wait = ttl === true ? DEFAULT_TTL : ttl;
  yield call(delay, wait);
  yield put(actions.destroy(notificationId));
}

export default [
  takeEvery(types.CREATE, planClosing),
  takeEvery(types.UPDATE, planClosing),
];
