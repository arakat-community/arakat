import {call, fork, put, take} from "redux-saga/effects";
import { IUser } from "../../../common/models/authentication/user";
import Exception from "../../../common/models/exception";
import { LoadingProgressManagement } from "../../../common/models/loading-progress/management";
import { ISnackbarMessage } from "../../../common/models/snackbar/message";
import { SnackbarType } from "../../../common/models/snackbar/type";
import LocalizationLanguages, { ILocalizationLanguage } from "../../../localization/languages";
import { finishLoadingProgress, startLoadingProgress } from "../../../store/loading-progress/actions";
import { changeLanguage } from "../../../store/localization/actions";
import { showSnackbar } from "../../../store/snackbar/actions";
import { fetchUsers, userSaved, userSaveFailed} from "../../../store/user-management/actions";
import { saveUser } from "../api";

/**
 * user save flow
 */
// tslint:disable-next-line:typedef
export function* saveUserFlow(user: IUser) {
    let message: ISnackbarMessage;
    try {
        yield put(startLoadingProgress(LoadingProgressManagement.manuel));
        const result: IUser = yield call(saveUser, user);
        yield put(userSaved(result));
        message = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "form.elements.success.process",
            type: SnackbarType.success,
        };
        yield put(showSnackbar(message));
    } catch (error) {
        yield put(userSaveFailed());

        const e: Exception = error as Exception;
        message = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "todo",
            type: SnackbarType.error,
        };
        yield put(showSnackbar(message));
    } finally {
        yield put(finishLoadingProgress());
        yield put(fetchUsers());
    }
}

/**
 * listens sagas for user management actions
 */
// tslint:disable-next-line:typedef
export function* saveUserWatcher() {
    while (true) {
        const action: any = yield take("@@userManagement/BEGIN_SAVE_USER");
        yield fork(saveUserFlow, action.payload.user);
    }
}
