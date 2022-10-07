import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card.jsx";
import { useInView } from "react-intersection-observer";

export default function BurgerIngredients(props) {
  const [refBuns, inViewBuns] = useInView({ threshold: 0.5 });
  const [refSauce, inViewSauce] = useInView({ threshold: 0.5 });
  const [refMain, inViewMain] = useInView({ threshold: 0.1 });
  const [current, setCurrent] = React.useState("one");

  const handleActiveTab = () => {
    if (inViewBuns) {
      setCurrent("one");
    } else if (inViewSauce) {
      setCurrent("two");
    } else if (inViewMain) {
      setCurrent("three");
    }
  };

  useEffect(() => {
    handleActiveTab();
  }, [inViewBuns, inViewSauce, inViewMain]);

  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  return (
    <section className={`${styles.section} mt-10`}>
      <h1 className="text text_type_main-large">{props.text}</h1>
      <ul className={`${styles.tab_bar} mt-5 mb-10`}>
        <li className={styles.bar_element}>
          <a href="#buns" className={styles.bar_link}>
            <Tab value="one" active={current === "one"} onClick={setCurrent}>
              Булки
            </Tab>
          </a>
        </li>
        <li className={styles.bar_element}>
          <a href="#sauce" className={styles.bar_link}>
            <Tab value="two" active={current === "two"} onClick={setCurrent}>
              Соусы
            </Tab>
          </a>
        </li>
        <li className={styles.bar_element}>
          <a href="#main" className={styles.bar_link}>
            <Tab
              value="three"
              active={current === "three"}
              onClick={setCurrent}
            >
              Начинки
            </Tab>
          </a>
        </li>
      </ul>
      <div className={styles.ingredients__container}>
        <div className={styles.ingredient_kind__container} ref={refBuns}>
          <h2 id="buns" className="text text_type_main-medium mb-6">
            Булки
          </h2>
          <ul className={`${styles.ingredients__list}`}>
            {ingredients.map(
              (ingredient) =>
                ingredient.type === "bun" && (
                  <li key={ingredient._id} className="mb-10">
                    <IngredientCard ingredient={ingredient} />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.ingredient_kind__container} ref={refSauce}>
          <h2 id="sauce" className="text text_type_main-medium mb-6">
            Соусы
          </h2>
          <ul className={`${styles.ingredients__list}`}>
            {ingredients.map(
              (ingredient) =>
                ingredient.type === "sauce" && (
                  <li key={ingredient._id} className="mb-8">
                    <IngredientCard ingredient={ingredient} />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.ingredient_kind__container} ref={refMain}>
          <h2 id="main" className="text text_type_main-medium mb-6">
            Начинки
          </h2>
          <ul className={`${styles.ingredients__list}`}>
            {ingredients.map(
              (ingredient) =>
                ingredient.type === "main" && (
                  <li key={ingredient._id} className="mb-10">
                    <IngredientCard ingredient={ingredient} />
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  text: PropTypes.string.isRequired,
};
