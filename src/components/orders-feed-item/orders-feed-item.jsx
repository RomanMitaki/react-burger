import styles from "./orders-feed-item.module.css";
import ItemImg from "../item-img/item-img";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

export default function OrdersFeedItem({ order }) {
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
 
  const selectedIngredients = order.ingredients.reduce((acc, ingredient) => {
    for (let i = 0; i < ingredients.length; i++) {
      if (ingredients[i]._id === ingredient) {
        const uniqueId = nanoid();

        acc.push({
          _id: ingredients[i]._id,
          price: ingredients[i].price,
          image: ingredients[i].image,
          name: ingredients[i].name,
          nanoId: uniqueId,
        });
      }
    }
    return acc;
  }, []);
  

  return (
    <Link to={"/feed/:id"} className={styles.container}>
      <div
        className={`${styles.item__container} ${styles.item__container_upper}`}
      >
        <p className="text text_type_digits-default">{`#${order.number}`}</p>
        <p className={`${styles.item__date} text text_type_main-default`}>
          {`${order.updatedAt}`}
        </p>
      </div>
      <h2 className="text text_type_main-medium">{`${order.name}`}</h2>
      <p className={`${styles.item__status} text text_type_main-default`}>
        {`${order.status}`}
      </p>
      <div
        className={`${styles.item__container} ${styles.item__container_bottom}`}
      >
        <div className={styles.item__imgContainer}>
          <ul className={styles.img__list}>
            {selectedIngredients.map((ingredient) => (
              <li key={ingredient.nanoId}>
                <ItemImg ingredient={ingredient} />
              </li>
            ))}
          </ul>
          <p className={`${styles.img__counter} text text_type_main-small`}>
            +3
          </p>
        </div>
        <div className={`${styles.item__price_container}`}>
          <p className={`${styles.item__price} text text_type_digits-default`}>
            480
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
}
