import {
  CLEAR_INGREDIENT_DETAILS,
  SET_INGREDIENT_DETAILS,
} from "../actions/ingredient-details";

const initialState = {
  ingredientDetails: {},
  isOpened: false,
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.item,
        isOpened: true,
      };
    }
    case CLEAR_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: {},
        isOpened: false,
      };
    }
    default: {
      return state;
    }
  }
};
