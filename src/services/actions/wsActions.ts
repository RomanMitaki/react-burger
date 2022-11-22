import {TWsMessageResponse} from "../../utils/types";


export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_CONNECTION_AUTH_START: "WS_CONNECTION_AUTH_START" = "WS_CONNECTION_AUTH_START";
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';

export type TWsConnectionSuccessAction = {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export type TWsConnectionErrorAction = {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: string;
}

export type TWsConnectionClosedAction = {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TWsGetMessageAction = {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TWsMessageResponse;
}

export type TWsSendMessageAction = {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: string;
}

export type TWsConnectionAuthStartAction = {
    readonly type: typeof WS_CONNECTION_AUTH_START;
}

export type TWsConnectionStartAction = {
    readonly type: typeof WS_CONNECTION_START;
}

export type TWsActions =
    TWsConnectionSuccessAction
    | TWsConnectionErrorAction
    | TWsConnectionClosedAction
    | TWsGetMessageAction
    | TWsSendMessageAction
    | TWsConnectionAuthStartAction
    | TWsConnectionStartAction


export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS,
    };
};

export const wsConnectionError = (error: string) => {
    return {
        type: WS_CONNECTION_ERROR,
        payload: error,
    };
};

export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED,
    };
};

export const wsGetMessage = (message: TWsMessageResponse) => {
    return {
        type: WS_GET_MESSAGE,
        payload: message,
    };
};

export const wsSendMessage = (message: string) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message,
    };
};

export const wsConnectionAuthStart = () => {
    return {
        type: WS_CONNECTION_AUTH_START,
    };
};

export const wsConnectionStart = () => {
    return {
        type: WS_CONNECTION_START,
    };
};


