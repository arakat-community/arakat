import {call, fork, put, take} from "redux-saga/effects";
import { IUserRole } from "../../../common/models/authentication/user-role";
import Exception from "../../../common/models/exception";
import { LoadingProgressManagement } from "../../../common/models/loading-progress/management";
import { ISnackbarMessage } from "../../../common/models/snackbar/message";
import { SnackbarType } from "../../../common/models/snackbar/type";
import { finishLoadingProgress, startLoadingProgress } from "../../../store/loading-progress/actions";
import { fetchUserRoles, userRoleUpdated, userRoleUpdateFailed } from "../../../store/role-management/actions";
import { showSnackbar } from "../../../store/snackbar/actions";
import { updateUserRole } from "../api";

/**
 * user update flow
 */
// tslint:disable-next-line:typedef
export function* updateUserRoleFlow(userRole: IUserRole) {
    let message: ISnackbarMessage;
    try {
        yield put(startLoadingProgress(LoadingProgressManagement.manuel));
        const result: IUserRole = yield call(updateUserRole, userRole);
        yield put(userRoleUpdated(result));
        message = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "form.elements.success.process",
            type: SnackbarType.success,
        };
        yield put(showSnackbar(message));
    } catch (error) {
        yield put(userRoleUpdateFailed());

        const e: Exception = error as Exception;
        message = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "todo",
            type: SnackbarType.error,
        };
        yield put(showSnackbar(message));
    } finally {
        yield put(finishLoadingProgress());
        yield put(fetchUserRoles());
    }
}

/**
 * listens sagas for user role actions
 */
// tslint:disable-next-line:typedef
export function* updateUserRoleWatcher() {
    while (true) {
        const action: any = yield take("@@userRoleManagement/BEGIN_UPDATE_USER_ROLE");
        yield fork(updateUserRoleFlow, action.payload.userRole);
    }
}
