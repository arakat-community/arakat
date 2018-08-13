import {AxiosPromise, AxiosResponse} from "axios";
import { Task } from "redux-saga";
import {call, cancel, fork, take} from "redux-saga/effects";
import { IUser } from "../../../common/models/authentication/user";
import { authenticate } from "../api";
import { loginFlow } from "./login-flow";
import { logout } from "./logout";

/**
 * listens sagas for authentication
 */
// tslint:disable-next-line:typedef
export function* authenticateWatcher() {
    while (true) {
        const {payload}: any = yield take("@@authentication/LOGIN_ATTEMPT");
        const task: Task = yield fork(loginFlow, payload.user);
        const action: any = yield take(["@@authentication/LOGIN_FAILED", "@@authentication/LOGOUT"]);
        if (action.type === "@@authentication/LOGIN_FAILED") {
            yield cancel(task);
        }

        yield call(logout, payload.user);
    }
}
