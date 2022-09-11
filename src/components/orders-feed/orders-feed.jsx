import styles from "./orders-feed.module.css";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";

export default function OrdersFeed() {
  return (
    <section className={`${styles.section} mt-10`}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <ul className={`${styles.feeditems__container}`}>
        <li>
          <OrdersFeedItem />
        </li>
        <li>
          <OrdersFeedItem />
        </li>
        <li>
          <OrdersFeedItem />
        </li>
        <li>
          <OrdersFeedItem />
        </li>
        <li>
          <OrdersFeedItem />
        </li>
        <li>
          <OrdersFeedItem />
        </li>
      </ul>
    </section>
  );
}
