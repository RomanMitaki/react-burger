import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

import data from "../../utils/data.js";

export default function App() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients text='Соберите бургер' data={data}/>
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}
