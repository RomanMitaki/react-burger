import { getEngredientsList } from "../../components/api";

export const GET_INGRIDIENTS_REQUEST = "GET_INGRIDIENTS_REQUEST";
export const GET_INGRIDIENTS_SUCCESS = "GET_INGRIDIENTS_SUCCESS";
export const GET_INGRIDIENTS_FAILED = "GET_INGRIDIENTS_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGRIDIENTS_REQUEST,
    });
    getEngredientsList()
      .then((res) => {
        if (res) {
          dispatch({
            type: GET_INGRIDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: GET_INGRIDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_INGRIDIENTS_FAILED,
        });
      });
  };
}
