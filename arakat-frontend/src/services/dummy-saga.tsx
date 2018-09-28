import {call, fork, put, take} from "redux-saga/effects";

/**
 * dummy doc
 */
export function* dummyWatcher() {
    while (true) {
        const action: any = yield take("@@app/CHANGE_THEME");
        yield console.log("theme changed");
    }
}
