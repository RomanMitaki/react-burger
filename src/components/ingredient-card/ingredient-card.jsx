import React from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types.js";

export default function IngredientCard(props) {
  return (
    <>
      <button className={styles.card__container} onClick={props.onClick}>
        <Counter count={1} size="default" />
        <img
          className={`${styles.card__img} `}
          src={props.ingredient.image}
          alt={props.ingredient.name}
        />
        <div className={`${styles.card__price_container}`}>
          <p className={`${styles.card__price} text text_type_digits-default`}>
            {props.ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`${styles.card__name} text text_type_main-default`}>
          {props.ingredient.name}
        </h3>
      </button>
    </>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientType.isRequired,
  onClick: PropTypes.func.isRequired,
};
