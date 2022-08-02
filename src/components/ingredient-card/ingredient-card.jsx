import React from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";
import { useDrag } from "react-dnd";

export default function IngredientCard({ ingredient, onClick }) {
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ingredient },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <>
      <button
        className={styles.card__container}
        onClick={onClick}
        ref={dragRef}
        style={{ opacity }}
      >
        <Counter count={1} size="default" />
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
