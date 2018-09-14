import { push } from "react-router-redux";
import { fetchDataWatcher } from "./index";
import { call, cancelled, put } from "redux-saga/effects";
import { IResultView } from "../../../common/models/resultView/result";
import { loginFailed, loginSuccessed } from "../../../store/authentication/actions";
import { dataReceived, dataReceivedFailed } from "../../../store/resultView/actions";

/**
 * login flow that makes call to authentication api and checks authentication
 */
// tslint:disable-next-line:typedef
export function* reportDataFetchFlow(user: any) {
    let result: IResultView;
    try {
        result = yield call(fetchDataWatcher);
        if (result) {
            yield put(dataReceived(result));
            yield put(push("/"));
        } else {
            throw new Error("Data Receive failed!");
        }
    } catch (error) {
        yield put(dataReceivedFailed());
    } finally {
        if (yield cancelled()) {
            yield put(push("/"));
        }
    }
}
