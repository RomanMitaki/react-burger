import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.css";

export default function IngredientDetails(props) {
  return (
    <div
      className={`${styles.popup__container_type_ingredientDetails} mt-10 mb-15 ml-10 mr-10`}
    >
      <h2 className={`${styles.popup__header} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <figure className={styles.popupImg__container}>
        <img
          className={styles.popupImg}
          src={props.data.image}
          alt={props.data.name}
        />
        <figcaption
          className={`${styles.popupCaption} mt-4 mb-8 text text_type_main-default`}
        >
          {props.data.name}
        </figcaption>
      </figure>
      <ul className={styles.description__list}>
        <li className={styles.description__item}>
          <p
            className={`${styles.description__text} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p
            className={`${styles.description__text} text text_type_digits-default text_color_inactive`}
          >
            {props.data.calories}
          </p>
        </li>
        <li className={styles.description__item}>
          <p
            className={`${styles.description__text} text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p
            className={`${styles.description__text} text text_type_digits-default text_color_inactive`}
          >
            {props.data.proteins}
          </p>
        </li>
        <li className={styles.description__item}>
          <p
            className={`${styles.description__text} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </p>
          <p
            className={`${styles.description__text} text text_type_digits-default text_color_inactive`}
          >
            {props.data.fat}
          </p>
        </li>
        <li className={styles.description__item}>
          <p
            className={`${styles.description__text} text text_type_main-default text_color_inactive`}
          >
            Углеводы, г
          </p>
          <p
            className={`${styles.description__text} text text_type_digits-default text_color_inactive`}
          >
            {props.data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}
