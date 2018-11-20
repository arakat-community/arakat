import {call, put, takeLatest} from "redux-saga/effects";
import { fetchEdgePermissions } from "../api";
import { edgePermissionsFetched } from "../../../store/cyto/actions";


/**
 * edge permissions fetch
 */
function* edgePermissionsFetch() {
    try {
        const fetchEdgePermissionsResponse = yield call(fetchEdgePermissions);
        if (fetchEdgePermissionsResponse) {
            yield put(edgePermissionsFetched(fetchEdgePermissionsResponse));
        }
    } catch ( error ) {
        console.log("edgePermissionsFetch() -> Edge permissions fetch failed!");
    }
}

/**
 * watcher
 */
export function* edgePermissionsFetchWatcher() {
    yield takeLatest("@@cyto/FETCH_EDGEPERMISSIONS", edgePermissionsFetch);
}
