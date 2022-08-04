import { SET_CURRENT_INGREDIENTS } from "../actions/burger-constructor";
import { nanoid } from "nanoid";

const initialState = {
  currentIngredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENTS: {
      const uniqueId = nanoid();
      const checkBuns = state.currentIngredients.some(
        (ingredient) => ingredient.type === "bun"
      );

      action.data = { ...action.data.ingredient, uniqueId };
      if (!checkBuns || action.data.type !== "bun") {
        return {
          ...state,
          currentIngredients: [...state.currentIngredients, action.data],
        };
      } else {
        return {
          ...state,
          currentIngredients: [...state.currentIngredients].map((ingredient) =>
            ingredient.type === "bun" ? action.data : ingredient
          ),
        };
      }
    }
    default: {
      return state;
    }
  }
};
