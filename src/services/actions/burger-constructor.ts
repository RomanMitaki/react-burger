import {nanoid} from "nanoid";
import {TIngredient} from "../../utils/types";

export const SET_CURRENT_INGREDIENTS: "SET_CURRENT_INGREDIENTS" = "SET_CURRENT_INGREDIENTS";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const SWAP_FILLINGS: "SWAP_FILLINGS" = "SWAP_FILLINGS";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const SET_TOTAL_PRICE: "SET_TOTAL_PRICE" = "SET_TOTAL_PRICE";

export const setCurrentIngredient = (ingredient: { ingredient: TIngredient }) => {
    const uniqueId = nanoid();
    // @ts-ignore
    ingredient = {...ingredient.ingredient, uniqueId};

    return {
        type: SET_CURRENT_INGREDIENTS,
        data: ingredient,
    };
};

export const deleteIngredient = (ingredient: TIngredient) => ({
    type: DELETE_INGREDIENT,
    data: ingredient,
});

export const swapFillings = (dragIndex: number, hoverIndex: number, ingredient: TIngredient) => ({
    type: SWAP_FILLINGS,
    data: {dragIndex, hoverIndex, ingredient},
});

export const clearConstructor = () => ({
    type: CLEAR_CONSTRUCTOR,
});

export const setTotalPrice = (totalPrice: number) => ({
    type: SET_TOTAL_PRICE,
    data: totalPrice,
});
