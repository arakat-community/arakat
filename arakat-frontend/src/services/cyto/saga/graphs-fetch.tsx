import {call, put, takeLatest} from "redux-saga/effects";
import { graphsFetched } from "../../../store/cyto/actions";
import { fetchGraphs } from "../api";

/**
 * nodeTreeFetch
 */
function* graphsFetch() {
    try {
        const response = yield call(fetchGraphs);
        console.log('response::: ');
        console.log(response);
        if (response) {
            yield put(graphsFetched(response));
        }
    } catch ( error ) {
        console.log("graphsFetch Failed!");
    }
}

/**
 * watcher
 */
export function* graphsFetchWatcher() {
    yield takeLatest("@@cyto/FETCH_GRAPHS", graphsFetch);
}
