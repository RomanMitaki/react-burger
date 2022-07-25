import { SET_CURRENT_INGREDIENTS } from "../actions/burger-constructor";

const initialState = {
  currentIngredients: [],
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENTS: {
      return {
        ...state,
        currentIngredients: action.data,
      };
    }
    default: {
      return state;
    }
  }
};
