import {call, put, fork, take} from "redux-saga/effects";
import { graphFetched } from "../../../store/cyto/actions";
import { fetchGraph } from "../api";

/**
 * nodeTreeFetch
 */
function* graphFetch(graphMongoId: string) {
    try {
        const response = yield call(fetchGraph, graphMongoId);
        console.log('response::: ');
        console.log(response);
        if (response) {
            yield put(graphFetched(response));
        }
    } catch ( error ) {
        console.log("graphFetch Failed!");
    }
}

/**
 * watcher
 */
export function* graphFetchWatcher() {
    const action: any = yield take("@@cyto/FETCH_GRAPH");
    yield fork(graphFetch, action.payload.graphMongoId);

}
