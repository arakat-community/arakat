import {call, put, takeLatest} from "redux-saga/effects";
import { INodeTree } from "../../../common/models/node-tree";
import { nodeTreeFetched } from "../../../store/drawer/actions";
import { fetchNodeTree } from "../api";

/**
 * nodeTreeFetch
 */
function* nodeTreeFetch() {
    try {
        const nodeTree: INodeTree = {
            data: yield call(fetchNodeTree),
        };
        if (nodeTree) {
            yield put(nodeTreeFetched(nodeTree));
        }
    } catch ( error ) {
        // TODO: yield put(nodeTreeFetchFailed());
        console.log("nodeTreeFetch() -> Node Tree fetch failed!");
    }
}

/**
 * watcher
 */
export function* nodeTreeFetchWatcher() {
    yield takeLatest("@@drawer/FETCH_NODETREE", nodeTreeFetch);
}
