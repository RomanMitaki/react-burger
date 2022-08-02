export const SET_CURRENT_INGREDIENTS = "SET_CURRENT_INGREDIENTS";

export const setCurrentIngredients = (ingredient, nanoidId) => ({
  type: SET_CURRENT_INGREDIENTS,
  data: {...ingredient, nanoidId},
});
