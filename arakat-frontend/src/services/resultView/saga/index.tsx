import {AxiosPromise, AxiosResponse} from "axios";
import { Task } from "redux-saga";
import {call, cancel, fork, take} from "redux-saga/effects";
import { IResultView } from "../../../common/models/resultView/result";
import {  } from "../api";

/**
 * listens sagas for resultView
 */
// tslint:disable-next-line:typedef
export function* fetchDataWatcher() {
    while (true) {
        const {payload}: any = yield take("@@resultView/DATA_REQUEST_ATTEMPT");
        const task: Task = yield fork(fetchDataWatcher, payload.resultView);
        const action: any = yield take(["@@resultView/DATA_RECEIVED_FAILED"]);
        if (action.type === "@@resultView/DATA_RECEIVED_FAILED") {
            yield cancel(task);
        }

        // yield call(logout, payload.user);
    }
}
