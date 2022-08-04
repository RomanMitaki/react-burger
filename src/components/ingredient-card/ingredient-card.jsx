import React from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function IngredientCard({ ingredient, onClick }) {
  const constructorData = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );

  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  const counter = useMemo(
    () =>
      (count = 0) => {
        const checkBuns = constructorData.filter(
          (element) => element.type === "bun"
        );
        const checkFillings = constructorData.filter(
          (element) => element.type !== "bun"
        );
        if (ingredient.type === "bun" && checkBuns.length !== 0) {
          count = checkBuns.filter(
            (element) => element._id === ingredient._id
          ).length;
          return count * 2;
        }
        if (ingredient.type !== "bun" && checkFillings.length !== 0) {
          count = checkFillings.filter(
            (element) => element._id === ingredient._id
          ).length;
          return count;
        }
      },
    [constructorData]
  );

  return (
    <>
      <button
        className={styles.card__container}
        onClick={onClick}
        ref={dragRef}
        style={{ opacity }}
      >
        <Counter
          count={counter()}
          size="default"
          style={{ display: counter() === 0 ? "none" : "block" }}
        />
        <img
          className={`${styles.card__img} `}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <div className={`${styles.card__price_container}`}>
          <p className={`${styles.card__price} text text_type_digits-default`}>
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.card__name} text text_type_main-default`}>
          {ingredient.name}
        </h3>
      </button>
    </>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired,
};
