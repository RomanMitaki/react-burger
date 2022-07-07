import React from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import PropTypes from "prop-types";

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
      >
        <IngredientDetails data={props.ingredient} />
      </Modal>
    </>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired,
  }).isRequired,
};
