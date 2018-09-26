import { fork} from "redux-saga/effects";
import { authenticateWatcher } from "../authentication/saga";
import { userFetchWatcher } from "../user-management/saga/fetch-user";
import { removeUserWatcher } from "../user-management/saga/remove-user";
import { saveUserWatcher } from "../user-management/saga/save-user";
import { updateUserWatcher } from "../user-management/saga/update-user";
import { userRoleFetchWatcher } from "../user-role/saga/fetch-user-roles";
import { removeUserRoleWatcher } from "../user-role/saga/remove-user-role";
import { saveUserRoleWatcher } from "../user-role/saga/save-user-role";
import { updateUserRoleWatcher } from "../user-role/saga/update-user-role";

/**
 * configuration for sagas
 */
// tslint:disable-next-line:typedef
export default function* rootSaga() {
    yield [
      fork(authenticateWatcher),
      fork(userFetchWatcher),
      fork(saveUserWatcher),
      fork(removeUserWatcher),
      fork(updateUserWatcher),
      fork(userRoleFetchWatcher),
      fork(saveUserRoleWatcher),
      fork(removeUserRoleWatcher),
      fork(updateUserRoleWatcher),
    ];
  }
