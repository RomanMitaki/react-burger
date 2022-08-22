import { combineReducers } from "redux";
import { burgerIngredientsReducer } from "./reducers/burger-ingredients";
import { burgerConstructorReducer } from "./reducers/burger-constructor";
import { ingredientDetailsReducer } from "./reducers/ingredient-details";
import { orderDetailsReducer } from "./reducers/order-details";
import { authReducer } from "./reducers/auth";

export const rootReducer = combineReducers({
  auth: authReducer,
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
});
