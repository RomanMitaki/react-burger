import styles from "./order-id-feed-item.module.css";
import ItemImg from "../item-img/item-img";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";

export default function OrderIdFeedItem({ ingredient }) {
  console.log(ingredient);

  return (
    <div className={styles.orderIdFeedItem__container}>
      <ItemImg ingredient={ingredient} />
      <div className={styles.orderIdFeedItem__info_container}>
        <p
          className={`${styles.orderIdFeedItem__text} text text_type_main-small`}
        >
          {ingredient.name}
        </p>
        <div>
          <div className={`${styles.orderIdFeedItem__price_container}`}>
            <p
              className={`${styles.orderIdFeedItem__price} text text_type_digits-default`}
            >
              {`${ingredient.quantity} x ${ingredient.price}`}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
