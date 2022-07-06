import React from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";

export default function IngredientCard(props) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <>
      <button
        className={styles.card__container}
        onClick={() => {
          setIsOpened(true);
        }}
      >
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
      <Modal
        onClose={() => {
          setIsOpened(false);
        }}
        isOpened={isOpened}
      />
    </>
  );
}
