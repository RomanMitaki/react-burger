import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/app/app.jsx";
import "./vendor/normalize.module.css";
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { Provider } from "react-redux";
import { rootReducer } from "./services/index";
import { BrowserRouter as Router } from "react-router-dom";
import { wsOrders, wsOrdersAuth } from "./utils/constants";
import {
  wsSendMessage,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage,
  WS_CONNECTION_START,
  WS_CONNECTION_AUTH_START,
} from "./services/actions/wsActions";

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};

const wsAuthActions = {
  wsInit: WS_CONNECTION_AUTH_START,
  wsSendMessage: wsSendMessage,
  onOpen: wsConnectionSuccess,
  onClose: wsConnectionClosed,
  onError: wsConnectionError,
  onMessage: wsGetMessage,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(socketMiddleware(wsOrders, wsActions, false)),
  applyMiddleware(socketMiddleware(wsOrdersAuth, wsAuthActions, true))
);
const store = createStore(rootReducer, enhancer);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
