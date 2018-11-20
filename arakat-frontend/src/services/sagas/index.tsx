
import { fork} from "redux-saga/effects";

import { nodeSpecsFetchWatcher } from "../cyto/saga/nodespecs-fetch";
import { edgePermissionsFetchWatcher } from "../cyto/saga/edgepermissions-fetch";
import { saveGraphWatcher } from "../cyto/saga/graph-save";
import { nodeTreeFetchWatcher } from "../drawer/saga/nodetree-fetch";

/**
 * configuration for sagas
 */
// tslint:disable-next-line:typedef

export default function* rootSaga() {
    yield [
      fork(nodeTreeFetchWatcher),
      fork(nodeSpecsFetchWatcher),
      fork(edgePermissionsFetchWatcher),
      fork(saveGraphWatcher)
    ];
  }
