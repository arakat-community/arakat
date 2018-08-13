import { push } from "react-router-redux";
import { call, put, PutEffect } from "redux-saga/effects";
import { IUser } from "../../../common/models/authentication/user";
import { logoutUser } from "../../../store/authentication/actions";
import { ILogout } from "../../../store/authentication/types";
import {logout as logoutAuthUser} from "../api";

/**
 * logout saga that process logout action
 */
// tslint:disable-next-line:typedef
export function* logout(user: IUser) {
    yield call(logoutAuthUser, user);
    yield put(logoutUser());
    yield put(push("/login"));
}
