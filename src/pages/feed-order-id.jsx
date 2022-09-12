import styles from "./feed-order-id.module.css";
import OrderIdFeedItem from "../components/order-id-feed-item/order-id-feed-item";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export function FeedOrderId() {
  return (
    <div className={styles.order__container}>
      <p className={`${styles.order__orderId} text text_type_digits-default`}>
        #034533
      </p>
      <h2 className={`${styles.order__header} text text_type_main-medium`}>
        Black Hole Singularity острый бургер
      </h2>
      <p className={`${styles.order__status} text text_type_main-default`}>
        Выполнен
      </p>
      <p className={`${styles.order__header} text text_type_main-medium`}>
        Состав:
      </p>
      <ul className={styles.orderIngredients__list}>
        <li><OrderIdFeedItem/></li>
        <li><OrderIdFeedItem/></li>
        <li><OrderIdFeedItem/></li>
        <li><OrderIdFeedItem/></li>
        <li><OrderIdFeedItem/></li>
        <li><OrderIdFeedItem/></li>
      </ul>
      <div className={styles.orderIngredients__dateAndPrice_container}>
        <p className={`${styles.order__date} text text_type_main-default`}>Вчера, 13:50 i-GMT+3</p>
        <div className={`${styles.order__price_container}`}>
          <p className={`${styles.order__price} text text_type_digits-default`}>
            480
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
