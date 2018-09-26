import { push } from "react-router-redux";
import {call, cancelled, fork, put, take, takeEvery, takeLatest} from "redux-saga/effects";
import { IUser } from "../../../common/models/authentication/user";
import Exception from "../../../common/models/exception";
import { ISnackbarMessage } from "../../../common/models/snackbar/message";
import { SnackbarType } from "../../../common/models/snackbar/type";
import { loginFailed } from "../../../store/authentication/actions";
import { finishLoadingProgress, startLoadingProgress } from "../../../store/loading-progress/actions";
import { showSnackbar } from "../../../store/snackbar/actions";
import { usersFetched, usersFetchFailed } from "../../../store/user-management/actions";
import { fetchUsers } from "../api";

/**
 * user list saga
 */
// tslint:disable-next-line:typedef
function* userFetch(filter: IUser) {
    try {
        yield put(startLoadingProgress());
        const result: IUser[] = yield call(fetchUsers, filter);
        if (result) {
            yield put(usersFetched(result));
        } else {
            throw new Error("login failed!");
        }
    } catch (error) {
        yield put(usersFetchFailed());

        const e: Exception = error as Exception;
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
 * listens sagas for user management actions
 */
// tslint:disable-next-line:typedef
export function* userFetchWatcher() {
    while (true) {
        const action: any = yield take("@@userManagement/BEGIN_FETCH_USERS");
        yield fork(userFetch, action.payload.filter);
    }
}
