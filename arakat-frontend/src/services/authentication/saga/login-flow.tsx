import { push } from "react-router-redux";
import { call, cancelled, put } from "redux-saga/effects";
import { IUser } from "../../../common/models/authentication/user";
import { loginFailed, loginSuccessed } from "../../../store/authentication/actions";
import { authenticate } from "../api";

/**
 * login flow that makes call to authentication api and checks authentication
 */
// tslint:disable-next-line:typedef
export function* loginFlow(user: any) {
    let result: IUser;
    try {
        result = yield call(authenticate, user);
        if (result) {
            yield put(loginSuccessed(result));
            yield put(push("/"));
        } else {
            throw new Error("login failed!");
        }
    } catch (error) {
        yield put(loginFailed());
    } finally {
        if (yield cancelled()) {
            yield put(push("/login"));
        }
    }
}
