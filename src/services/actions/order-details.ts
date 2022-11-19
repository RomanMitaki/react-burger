import {getOrder} from "../../utils/api";
import {clearConstructor} from "./burger-constructor";

export const SET_ORDER_DETAILS: "SET_ORDER_DETAILS" = "SET_ORDER_DETAILS";
export const CLEAR_ORDER_DETAILS: "CLEAR_ORDER_DETAILS" = "CLEAR_ORDER_DETAILS";

export const GET_ORDERNUMBER_REQUEST: "GET_ORDERNUMBER_REQUEST" = "GET_ORDERNUMBER_REQUEST";
export const GET_ORDERNUMBER_SUCCESS: "GET_ORDERNUMBER_SUCCESS" = "GET_ORDERNUMBER_SUCCESS";
export const GET_ORDERNUMBER_FAILED: "GET_ORDERNUMBER_FAILED" = "GET_ORDERNUMBER_FAILED";

export type TSetOrderDetailsAction = {
    readonly type: typeof SET_ORDER_DETAILS;
}

export type TClearOrderDetailsAction = {
    readonly type: typeof CLEAR_ORDER_DETAILS;
}

export type TGetOrderNumberRequestAction = {
    readonly type: typeof GET_ORDERNUMBER_REQUEST;
}

export type TGetOrderNumberSuccessAction = {
    readonly type: typeof GET_ORDERNUMBER_SUCCESS;
    readonly orderNumber: number | null;
}

export type TGetOrderNumberFailedAction = {
    readonly type: typeof GET_ORDERNUMBER_FAILED;
}

export type TOrderDetailsActions =
    TSetOrderDetailsAction
    | TClearOrderDetailsAction
    | TGetOrderNumberRequestAction
    | TGetOrderNumberSuccessAction
    | TGetOrderNumberFailedAction;

export const getNumberOfOrder = (ingredientsId: string[]) => {
    return function (dispatch) {
        dispatch({
            type: GET_ORDERNUMBER_REQUEST,
        });
        getOrder(ingredientsId)
            .then((res) => {
                if (res) {
                    dispatch({
                        type: GET_ORDERNUMBER_SUCCESS,
                        orderNumber: res.order.number,
                    });
                    dispatch(clearConstructor());
                } else {
                    dispatch({
                        type: GET_ORDERNUMBER_FAILED,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDERNUMBER_FAILED,
                });
            });
    };
};
