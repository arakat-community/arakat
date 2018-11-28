import {call, takeLatest} from "redux-saga/effects";
import { runGraph } from "../api";

/**
 * graph save
 */
function* graphRun(action) {
    try {
        const response = yield call(runGraph, action.payload.graph);
        console.log('response:');
        console.log(response);        
    } catch ( error ) {
        console.log("graphRun() -> failed! | error: ");
        console.log(error);
    }
}

/**
 * watcher
 */
export function* runGraphWatcher() {
    yield takeLatest("@@cyto/SAVE_GRAPH", graphRun);
}
