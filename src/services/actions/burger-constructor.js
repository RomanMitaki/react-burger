export const SET_CURRENT_INGREDIENTS = "SET_CURRENT_INGREDIENTS";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SWAP_FILLINGS = 'SWAP_FILLINGS';

export const setCurrentIngredients = (ingredient) => ({
  type: SET_CURRENT_INGREDIENTS,
  data: ingredient,
});

export const deleteIngredient = (ingredient) => ({
  type: DELETE_INGREDIENT,
  data: ingredient,
});

export const swapFillings = (dragIndex, hoverIndex, ingredient) => ({type: SWAP_FILLINGS, data: {dragIndex, hoverIndex, ingredient}})
