import styles from "./item-img.module.css";
import { useSelector } from "react-redux";

export default function ItemImg() {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  return (
    <div className={styles.img__border_gradient}>
      <div className={styles.img__container}>
        <img className={styles.img} src={ingredients[8].image} alt="#" />
      </div>
    </div>
  );
}
