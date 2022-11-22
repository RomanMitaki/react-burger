import {getIngredientsList} from "../../utils/api";
import {TIngredient} from "../../utils/types";
import {AppDispatch} from "../../index";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export type TGetIngredientsRequestAction = {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export type TGetIngredientsSuccessAction = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}

export type TGetIngredientsFailedAction = {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TBurgerIngredientsActions =
    TGetIngredientsRequestAction
    | TGetIngredientsSuccessAction
    | TGetIngredientsFailedAction

export function getIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        getIngredientsList()
            .then((res) => {
                if (res) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data,
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED,
                    });
                }
            })
            .catch((err) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
}
