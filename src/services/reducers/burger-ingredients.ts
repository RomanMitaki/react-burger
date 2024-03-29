import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    TBurgerIngredientsActions
} from "../actions/burger-ingredients";
import {TIngredient} from "../../utils/types";


type TBurgerIngredientsState = {
    ingredients: TIngredient[],
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,
}

const initialState: TBurgerIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.ingredients,
                ingredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
            };
        }
        default: {
            return state;
        }
    }
};
