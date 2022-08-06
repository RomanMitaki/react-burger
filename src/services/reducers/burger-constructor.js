import {
  SET_CURRENT_INGREDIENTS,
  DELETE_INGREDIENT,
  SWAP_FILLINGS,
} from "../actions/burger-constructor";
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

    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].filter(
          (ingredient) => ingredient !== action.data
        ),
      };
    }

    case SWAP_FILLINGS: {
      const coppiedState = [...state.currentIngredients];
      const prevIngredient = coppiedState.splice(action.data.hoverIndex, 1, action.data.ingredient);
      coppiedState.splice(action.data.dragIndex, 1, prevIngredient[0]);
      return {
        ...state,
        currentIngredients: coppiedState,
      };
    }

    default: {
      return state;
    }
  }
};
