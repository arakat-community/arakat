
import { fork} from "redux-saga/effects";

import { nodeTreeFetchWatcher } from "../drawer/saga/nodetree-fetch";

/**
 * configuration for sagas
 */
// tslint:disable-next-line:typedef

export default function* rootSaga() {
    yield [
      fork(nodeTreeFetchWatcher),
    ];
  }
