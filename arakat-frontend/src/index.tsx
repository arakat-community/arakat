import { createMuiTheme, MuiThemeProvider, Theme } from "@material-ui/core";
import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import { render } from "react-dom";
import { Provider, Store } from "react-redux";
import { Router } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Task } from "redux-saga";
import App from "./app";
import { ISnackbarMessage } from "./common/models/snackbar/message";
import configureStore, {
  history,
  persistor,
  runSagas,
} from "./config/store/redux";
import LocalizerContainer from "./containers/localization/localizer";
import "./index.css";
import { getLocale, Messages } from "./localization";
import { IApplicationState } from "./store";

const applicationInitialState: IApplicationState = {
  authentication: null,
  form: null,
  localization: {
    locale: getLocale(navigator.language.split("-")[0]),
    messages: Messages.getMessages(getLocale(navigator.language.split("-")[0])),
  },
  routing: null,
  snackbar: {
    messages: [],
  },
};

const store: Store<IApplicationState> = configureStore(applicationInitialState);
const task: Task = runSagas();

render(
  <Provider store={store}>
    <LocalizerContainer>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <App locale={applicationInitialState.localization.locale} />
        </PersistGate>
      </ConnectedRouter>
    </LocalizerContainer>
  </Provider>,
  document.getElementById("root"),
);
