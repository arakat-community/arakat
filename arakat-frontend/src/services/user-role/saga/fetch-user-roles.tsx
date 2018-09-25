import {call, fork, put, take} from "redux-saga/effects";
import { IUserRole } from "../../../common/models/authentication/user-role";
import { ISnackbarMessage } from "../../../common/models/snackbar/message";
import { SnackbarType } from "../../../common/models/snackbar/type";
import { finishLoadingProgress, startLoadingProgress } from "../../../store/loading-progress/actions";
import { userRolesFetched, userRolesFetchFailed } from "../../../store/role-management/actions";
import { showSnackbar } from "../../../store/snackbar/actions";
import { fetchUserRoles } from "../api";

/**
 * user list saga
 */
// tslint:disable-next-line:typedef
function* userRoleFetch(filter: IUserRole) {
    try {
        yield put(startLoadingProgress());
        const result: IUserRole[] = yield call(fetchUserRoles, filter);
        if (result) {
            yield put(userRolesFetched(result));
        } else {
            throw new Error("login failed!");
        }
    } catch (error) {
        yield put(userRolesFetchFailed());

        const message: ISnackbarMessage = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "todo",
            type: SnackbarType.error,
        };
        yield put(showSnackbar(message));
    } finally {
        yield put(finishLoadingProgress());
    }
}

/**
 * listens sagas for user role actions
 */
// tslint:disable-next-line:typedef
export function* userRoleFetchWatcher() {
    while (true) {
        const action: any = yield take("@@userRoleManagement/BEGIN_FETCH_USER_ROLES");
        yield fork(userRoleFetch, action.payload.filter);
    }
}
