import { push } from "react-router-redux";
import { call, cancelled, put } from "redux-saga/effects";
import { IAuthenticationToken } from "../../../common/models/authentication/token";
import { IUser } from "../../../common/models/authentication/user";
import Exception from "../../../common/models/exception";
import { ISnackbarMessage } from "../../../common/models/snackbar/message";
import { SnackbarType } from "../../../common/models/snackbar/type";
import { IAuthenticationForm } from "../../../components/login/panel";
import { authTokenFetched, loginFailed, loginSuccessed } from "../../../store/authentication/actions";
import { finishLoadingProgress, startLoadingProgress } from "../../../store/loading-progress/actions";
import { showSnackbar } from "../../../store/snackbar/actions";
import { authenticate, getUser } from "../api";

/**
 * login flow that makes call to authentication api and checks authentication
 */
// tslint:disable-next-line:typedef
export function* loginFlow(user: IAuthenticationForm) {
    let result: IUser;
    let access_token: IAuthenticationToken;
    try {
        yield put(startLoadingProgress());
        access_token = yield call(authenticate, user);
        if (access_token) {
            yield put(authTokenFetched(access_token));
            result = yield call(getUser);
            yield put(loginSuccessed(result));
            yield put(push("/"));
        } else {
            throw new Error("login failed!");
        }
    } catch (error) {
        const e: Exception = error as Exception;
        const message: ISnackbarMessage = {
            id: new Date().getUTCMilliseconds().toString(),
            messageId: "todo",
            type: SnackbarType.error,
        };
        yield put(showSnackbar(message));
        yield put(loginFailed());
    } finally {
        yield put(finishLoadingProgress());
        if (yield cancelled()) {
            yield put(push("/login"));
        }
    }
}
