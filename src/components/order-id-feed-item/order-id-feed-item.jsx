import styles from "./order-id-feed-item.module.css";
import ItemImg from "../item-img/item-img";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderIdFeedItem() {
  return (
    <div className={styles.orderIdFeedItem__container}>
      <ItemImg />
      <div className={styles.orderIdFeedItem__info_container}>
        <p
          className={`${styles.orderIdFeedItem__text} text text_type_main-small`}
        >
          Флюоресцентная булка R2-D3
        </p>
        <div>
          <div className={`${styles.orderIdFeedItem__price_container}`}>
            <p
              className={`${styles.orderIdFeedItem__price} text text_type_digits-default`}
            >
              2 x 480
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
