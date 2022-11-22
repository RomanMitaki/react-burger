import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./components/app/app";
import "./vendor/normalize.module.css";
import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {Provider} from "react-redux";
import {rootReducer} from "./services";
import {BrowserRouter as Router} from "react-router-dom";
import {wsOrders, wsOrdersAuth} from "./utils/constants";
import {
    wsSendMessage,
    wsConnectionSuccess,
    wsConnectionClosed,
    wsConnectionError,
    wsGetMessage,
    WS_CONNECTION_START,
    WS_CONNECTION_AUTH_START,
} from "./services/actions/wsActions";
import {ThunkAction} from "redux-thunk";
import {ActionCreator} from "redux";
import {TAuthActions} from "./services/actions/auth";
import {TBurgerIngredientsActions} from "./services/actions/burger-ingredients";
import {TBurgerConstructorActions} from "./services/actions/burger-constructor";
import {TOrderDetailsActions} from "./services/actions/order-details";
import {TWsActions} from "./services/actions/wsActions";


type TActions =
    TWsActions
    | TAuthActions
    | TOrderDetailsActions
    | TBurgerConstructorActions
    | TBurgerIngredientsActions;


export type TWsMiddleware = {
    wsInit: typeof WS_CONNECTION_START | typeof WS_CONNECTION_AUTH_START,
    wsSendMessage: ActionCreator<TWsActions>,
    onOpen: ActionCreator<TWsActions>,
    onClose: ActionCreator<TWsActions>,
    onError: ActionCreator<TWsActions>,
    onMessage: ActionCreator<TWsActions>,
}


const wsActions: TWsMiddleware = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: wsSendMessage,
    onOpen: wsConnectionSuccess,
    onClose: wsConnectionClosed,
    onError: wsConnectionError,
    onMessage: wsGetMessage,
};

const wsAuthActions: TWsMiddleware = {
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
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, RootState, unknown, TActions>>;
export type AppDispatch = typeof store.dispatch;


const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
);
