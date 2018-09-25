import {call, fork, put, take} from "redux-saga/effects";
import { IUser } from "../../../common/models/authentication/user";
import { LoadingProgressManagement } from "../../../common/models/loading-progress/management";
import { ISnackbarMessage } from "../../../common/models/snackbar/message";
import { SnackbarType } from "../../../common/models/snackbar/type";
import { finishLoadingProgress, startLoadingProgress } from "../../../store/loading-progress/actions";
import { fetchUserRoles, userRoleRemoved, userRoleRemoveFailed } from "../../../store/role-management/actions";
import { showSnackbar } from "../../../store/snackbar/actions";
import { removeUserRole } from "../api";

/**
 * user remove flow
 */
// tslint:disable-next-line:typedef
export function* removeUserRoleFlow(userRoleId: number) {
    let message: ISnackbarMessage;
    try {
        yield put(startLoadingProgress(LoadingProgressManagement.manuel));
        const result: IUser = yield call(removeUserRole, userRoleId);
        yield put(userRoleRemoved(result));
        message = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "form.elements.success.process",
            type: SnackbarType.success,
        };
        yield put(showSnackbar(message));
    } catch (error) {
        yield put(userRoleRemoveFailed());

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
export function* removeUserRoleWatcher() {
    while (true) {
        const action: any = yield take("@@userRoleManagement/BEGIN_REMOVE_USER_ROLE");
        yield fork(removeUserRoleFlow, action.payload.userRoleId);
    }
}
