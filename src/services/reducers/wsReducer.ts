import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    TWsActions
} from "../actions/wsActions";

type TWsState = {
    wsConnected: boolean,
    error: string | undefined,
    orders: [{
        ingredients: string[],
        _id: string,
        status: string,
        number: number,
        createdAt: string,
        updatedAt: string,
    }] | [],
    total: number,
    totalToday: number,
}

const initialState: TWsState = {
    wsConnected: false,
    error: undefined,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWsActions) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                error: action.payload,
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                error: undefined,
                orders: [],
                total: 0,
                totalToday: 0,
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday,
            };

        default:
            return state;
    }
};
