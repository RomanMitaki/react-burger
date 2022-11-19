import {getIngredientsList} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

export function getIngredients() {
    return function (dispatch) {
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
