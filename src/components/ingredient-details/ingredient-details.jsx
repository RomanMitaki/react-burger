import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function IngredientDetails() {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const { id } = useParams();

  const ingredient = ingredients?.find(({ _id }) => _id === id);

  if (!ingredient) {
    return null;
  }
  
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
          src={ingredient.image}
          alt={ingredient.name}
        />
        <figcaption
          className={`${styles.popupCaption} mt-4 mb-8 text text_type_main-default`}
        >
          {ingredient.name}
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
            {ingredient.calories}
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
            {ingredient.proteins}
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
            {ingredient.fat}
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
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}




