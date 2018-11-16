import {call, takeLatest} from "redux-saga/effects";
import { saveGraph } from "../api";

/**
 * graph save
 */
function* graphSave(action) {
    try {
        yield call(saveGraph, action.payload.graph);
    } catch ( error ) {
        console.log("graphSave() -> failed! | error: ");
        console.log(error);
    }
}

/**
 * watcher
 */
export function* saveGraphWatcher() {
    yield takeLatest("@@cyto/SAVE_GRAPH", graphSave);
}
