import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import API from "../../utils/constants.js";
import { createContext } from "react";

export const IngredientsContext = createContext([]);

export default function App() {
  const [ingredients, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) {
          throw new Error(`res.ok: ${res.ok}, res.status: ${res.status}`);
        }
        const data = await res.json();
        setData(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients text="Соберите бургер" data={ingredients} />
        <IngredientsContext.Provider value={ingredients}>
          {ingredients.length && <BurgerConstructor />}
        </IngredientsContext.Provider>
      </main>
    </div>
  );
}
