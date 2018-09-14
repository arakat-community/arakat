import { takeLatest } from "redux-saga/effects";
import { authenticateWatcher } from "../authentication/saga";
import { fetchDataWatcher } from "../resultView/saga";

/**
 * configuration for sagas
 */
// tslint:disable-next-line:typedef
export default function* rootSaga() {
    yield [
      authenticateWatcher(),
      fetchDataWatcher(),
    ];
  }
