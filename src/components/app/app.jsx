import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";

export default function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients text='Соберите бургер'/>
      </main>
    </div>
  );
}
