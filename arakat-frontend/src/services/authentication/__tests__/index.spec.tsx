import {push} from "react-router-redux";
import {expectSaga, testSaga} from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import {throwError} from "redux-saga-test-plan/providers";
import {call} from "redux-saga/effects";
import {IUser} from "../../../common/models/authentication/user";
import {IAuthenticationForm} from "../../../components/login/panel";
import {attemptLogin, loginFailed, loginSuccessed} from "../../../store/authentication/actions";
import {authenticate} from "../api";
import {authenticateWatcher} from "../saga";
import {loginFlow} from "../saga/login-flow";

describe("authentication api tests", () => {
    test("successful authentication flow test", () => {
        // tslint:disable-next-line:typedef
        const authenticatedUser = {
            name: "Murat",
            surname: "Çatal",
        };

        // tslint:disable-next-line:typedef
        const payload = {
            payload: {
                user: {
                    password: "1234",
                    username: "murat",
                },
            },
        };

        testSaga(authenticateWatcher)
            .next()
            .take("@@authentication/LOGIN_ATTEMPT")
            .next(payload)
            .fork(loginFlow, payload.payload.user)
            .next()
            .take(["@@authentication/LOGIN_FAILED"])
            .next(loginSuccessed(authenticatedUser))
            .take("@@authentication/LOGIN_ATTEMPT")
            .finish();
    });

    test("successful login flow test", () => {
        const user: IAuthenticationForm = {
            password: "1111",
            remember_me: false,
            username: "murat",
            grant_type:"password"
        };

        const authenticatedUser: any = {
            name: "Murat",
            surname: "Çatal",
        };

        testSaga(loginFlow, user)
            .next()
            .call(authenticate, user)
            .next(authenticatedUser)
            .put(loginSuccessed(authenticatedUser))
            .next()
            .put(push("/"))
            .next()
            .cancelled()
            .next()
            .isDone();
    });

    test("login failed login flow test", () => {
        const user: IAuthenticationForm = {
            password: "1111",
            remember_me: true,
            username: "murat",
            grant_type:"password"
        };

        const error: any = new Error("login failed!");

        testSaga(loginFlow, user)
            .next()
            .call(authenticate, user)
            .throw(error)
            .put(loginFailed())
            .next()
            .cancelled()
            .next()
            .isDone();
    });
});
