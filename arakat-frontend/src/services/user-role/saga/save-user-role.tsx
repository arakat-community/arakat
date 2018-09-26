import {call, fork, put, take} from "redux-saga/effects";
import { IUserRole } from "../../../common/models/authentication/user-role";
import { LoadingProgressManagement } from "../../../common/models/loading-progress/management";
import { ISnackbarMessage } from "../../../common/models/snackbar/message";
import { SnackbarType } from "../../../common/models/snackbar/type";
import { finishLoadingProgress, startLoadingProgress } from "../../../store/loading-progress/actions";
import { fetchUserRoles, userRoleSaved, userRoleSaveFailed } from "../../../store/role-management/actions";
import { showSnackbar } from "../../../store/snackbar/actions";
import { saveUserRole } from "../api";

/**
 * user save flow
 */
// tslint:disable-next-line:typedef
export function* saveUserRoleFlow(userRole: IUserRole) {
    let message: ISnackbarMessage;
    try {
        yield put(startLoadingProgress(LoadingProgressManagement.manuel));
        const result: IUserRole = yield call(saveUserRole, userRole);
        yield put(userRoleSaved(result));
        message = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "form.elements.success.process",
            type: SnackbarType.success,
        };
        yield put(showSnackbar(message));
    } catch (error) {
        yield put(userRoleSaveFailed());

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
 * listens sagas for user management actions
 */
// tslint:disable-next-line:typedef
export function* saveUserRoleWatcher() {
    while (true) {
        const action: any = yield take("@@userRoleManagement/BEGIN_SAVE_USER_ROLE");
        yield fork(saveUserRoleFlow, action.payload.userRole);
    }
}
