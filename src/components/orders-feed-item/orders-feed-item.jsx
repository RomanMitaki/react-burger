import styles from "./orders-feed-item.module.css";
import ItemImg from "../item-img/item-img";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrdersFeedItem() {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.item__container} ${styles.item__container_upper}`}
      >
        <p className="text text_type_digits-default">#034535</p>
        <p className={`${styles.item__date} text text_type_main-default`}>
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <h2 className="text text_type_main-medium">
        Death Star Starship Main бургер
      </h2>
      <p className={`${styles.item__status} text text_type_main-default`}>
        Создан
      </p>
      <div
        className={`${styles.item__container} ${styles.item__container_bottom}`}
      >
        <div className={styles.item__imgContainer}>
          <ul className={styles.img__list}>
            <li>
              <ItemImg />
            </li>
            <li>
              <ItemImg />
            </li>
            <li>
              <ItemImg />
            </li>
            <li>
              <ItemImg />
            </li>
            <li>
              <ItemImg />
            </li>
            <li>
              <ItemImg />
            </li>
            <li>
              <ItemImg />
            </li>
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
    </div>
  );
}
