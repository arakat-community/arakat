
import { fork} from "redux-saga/effects";

import { dummyWatcher } from "../dummy-saga";

/**
 * configuration for sagas
 */
// tslint:disable-next-line:typedef

export default function* rootSaga() {
    yield [
      fork(dummyWatcher),
    ];
  }
