import React, { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";

export default function App() {
  const dispatch = useDispatch();
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.burgerIngredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.content}>
        {ingredientsRequest && "Загрузка..."}
        {ingredientsFailed && "Произошла ошибка при получении данных"}
        {!ingredientsRequest && !ingredientsFailed && ingredients.length && (
          <BurgerIngredients text="Соберите бургер" />
        )}
        {ingredients.length && <BurgerConstructor />}
      </main>
    </div>
  );
}
