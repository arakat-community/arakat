import History from "history";
import createBrowserHistory from "history/createBrowserHistory";
import { routerMiddleware, routerReducer } from "react-router-redux";
import {AnyAction, applyMiddleware, combineReducers, createStore, Middleware, Store} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {PersistPartial, persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/es/storage";
import sagaMiddlewareFactory, { SagaMiddleware, Task } from "redux-saga";
import rootSaga from "../../services/sagas/index";
import { IApplicationState, reducers } from "../../store";

export const history: History.History = createBrowserHistory();
const reactRouterMiddleware: Middleware = routerMiddleware(history);
export const sagaMiddleware: SagaMiddleware<{}> = sagaMiddlewareFactory();

export const runSagas: () => Task = () => sagaMiddleware.run(rootSaga);

const persistConfig: any = {
    key: "root",
    storage,
    whitelist: ["localization", "theme"],
};

export let persistor: any;
/**
 * Configures redux store
 * @param initialState application's initial state
 * @returns redux store object
 */
export default function configureStore(
    initialState: IApplicationState,
): Store<IApplicationState> {
    // tslint:disable-next-line:typedef
    const composeEnhancers = composeWithDevTools({});

    const persistedReducer: any = persistReducer(persistConfig, reducers);
    const store: any = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(
        sagaMiddleware,
        reactRouterMiddleware,
      )));
    persistor = persistStore(store);

    return store;
}
