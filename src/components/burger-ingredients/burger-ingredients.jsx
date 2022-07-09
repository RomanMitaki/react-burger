import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientCard from "../ingredient-card/ingredient-card.jsx";
import ingredientType from "../../utils/types.js";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("one");
  const [modalKind, setIsOpened] = React.useState({
    isOpened: false,
    ingredientDetails: {},
  });

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
        <div className={styles.ingredient_kind__container}>
          <h2 id="buns" className="text text_type_main-medium mb-6">
            Булки
          </h2>
          <ul className={`${styles.ingredients__list}`}>
            {props.data.map(
              (ingredient) =>
                ingredient.type === "bun" && (
                  <li key={ingredient._id} className="mb-10">
                    <IngredientCard
                      ingredient={ingredient}
                      onClick={() => {
                        setIsOpened({
                          isOpened: true,
                          ingredientDetails: ingredient,
                        });
                      }}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.ingredient_kind__container}>
          <h2 id="sauce" className="text text_type_main-medium mb-6">
            Соусы
          </h2>
          <ul className={`${styles.ingredients__list}`}>
            {props.data.map(
              (ingredient) =>
                ingredient.type === "sauce" && (
                  <li key={ingredient._id} className="mb-8">
                    <IngredientCard
                      ingredient={ingredient}
                      onClick={() => {
                        setIsOpened({
                          isOpened: true,
                          ingredientDetails: ingredient,
                        });
                      }}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.ingredient_kind__container}>
          <h2 id="main" className="text text_type_main-medium mb-6">
            Начинки
          </h2>
          <ul className={`${styles.ingredients__list}`}>
            {props.data.map(
              (ingredient) =>
                ingredient.type === "main" && (
                  <li key={ingredient._id} className="mb-10">
                    <IngredientCard
                      ingredient={ingredient}
                      onClick={() => {
                        setIsOpened({
                          isOpened: true,
                          ingredientDetails: ingredient,
                        });
                      }}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <Modal
        onClose={() => {
          setIsOpened({ isOpened: false, ingredientDetails: {} });
        }}
        isOpened={modalKind.isOpened}
      >
        <IngredientDetails data={modalKind.ingredientDetails} />
      </Modal>
    </section>
  );
}

BurgerIngredients.propTypes = {
  text: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
