import React from "react";
import styles from "./home-page.module.css";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../components/burger-constructor/burger-constructor.jsx";
import { useSelector } from "react-redux";

export function Home() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(
    (store) => store.burgerIngredients
  );
  return (
    <div className={styles.page}>
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
