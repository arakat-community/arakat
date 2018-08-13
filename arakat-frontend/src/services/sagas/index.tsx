import { takeLatest } from "redux-saga/effects";
import { authenticateWatcher } from "../authentication/saga";

/**
 * configuration for sagas
 */
// tslint:disable-next-line:typedef
export default function* rootSaga() {
    yield [
      authenticateWatcher(),
    ];
  }
