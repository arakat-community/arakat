import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {ConnectedRouter} from "react-router-redux";
import {Store} from "redux";
import {PersistGate} from "redux-persist/integration/react";
import {Task} from "redux-saga";
import App from "./app";
import { DataSourceItemType, DataSourceType } from "./common/models/datasource";
import configureStore, {history, persistor, runSagas} from "./config/store/redux";
import LocalizerContainer from "./containers/localization/localizer";
import {getLocale, Messages} from "./localization";
import LocalizationLanguages from "./localization/languages";
import {IApplicationState} from "./store";

//TODO: is this initialization necessary? why? it is done in reducers already.
const applicationInitialState: IApplicationState = {
    appConfig: {
        appLogo: "/assets/images/logo.png",
        appBrand: "ARAKAT",
        appName: "",
        theme: {
            type: "dark",
        },
    },
    drawer: {
        isOpen: false,
        nodeTree: {
            data: [],
        },
    },
    cyto: {
        nodeSpecs: [],
        cvNodesLength: 0,
        pipelineNodesLength: 0,
        taskNodesLength: 0,
        existingNodes: [],
        selectedNode: null,
        isDialogOpen: false,
        lastDroppedNodeOffset: {
            x: 0,
            y: 0,
        },
        isPrimitiveLevelLayoutRefreshBlocked: false,
        edgePermissions: {},
        graph: undefined,
        graphNodes: {},
        graphEdges: {},
        graphProperties: undefined,
        isGraphPropertiesDialogOpen: false,
    },
    form: null,
    localization: {
        locale: getLocale(LocalizationLanguages.DefaultLanguage.code),
        messages: Messages.getMessages(getLocale(LocalizationLanguages.DefaultLanguage.code)),
    },
    request: null,
    routing: null,
    snackbar: {
        messages: [],
    },

};

const store: Store <IApplicationState> = configureStore(applicationInitialState);
const task: Task = runSagas();

/**
 * function which is used by react-int pollyfil
 */
const runApp: () => void = () => {
    render(
        <Provider
            store={store}
        >
            <LocalizerContainer>
                    <ConnectedRouter
                        history={history}
                    >
                        <PersistGate
                            loading={null}
                            persistor={persistor}
                        >
                            <App
                                locale={applicationInitialState.localization.locale}
                                theme={applicationInitialState.appConfig.theme}
                            />
                        </PersistGate>
                    </ConnectedRouter>
            </LocalizerContainer>
        </Provider>,
        document.getElementById("root"));
};

/**
 * this part pollyfil for react-intl to support ie
 */
if (!global.Intl) {
    require.ensure([
        "intl",
        "intl/locale-data/jsonp/ar.js",
        "intl/locale-data/jsonp/en.js",
        "intl/locale-data/jsonp/tr.js",
    // tslint:disable-next-line:typedef
    ],             (require) => {
        require("intl");
        require("intl/locale-data/jsonp/ar.js");
        require("intl/locale-data/jsonp/en.js");
        require("intl/locale-data/jsonp/tr.js");
        runApp();
    });
} else {
    runApp();
}
