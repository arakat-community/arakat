import {call, put, takeLatest} from "redux-saga/effects";
import { nodeSpecsFetched } from "../../../store/cyto/actions";
import { fetchNodeSpecs } from "../api";

/**
 * nodeTreeFetch
 */
function* nodeSpecsFetch() {
    try {
        const fetchNodeSpecsResponse = yield call(fetchNodeSpecs);
        if (fetchNodeSpecsResponse) {
            yield put(nodeSpecsFetched(fetchNodeSpecsResponse));
        }
    } catch ( error ) {
        console.log("nodeSpecsFetch() -> Node specs fetch failed!");
    }
}

/**
 * watcher
 */
export function* nodeSpecsFetchWatcher() {
    yield takeLatest("@@cyto/FETCH_NODESPECS", nodeSpecsFetch);
}
