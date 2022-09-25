import styles from "./orders-feed.module.css";
import { useSelector } from "react-redux";
import OrdersFeedItem from "../orders-feed-item/orders-feed-item";

export default function OrdersFeed({display}) {
  const orders = useSelector((store) => store.wsOrders.orders);
  console.log(orders);

  if (!orders) {
    return null;
  }

  return (
    <section className={`${styles.section} mt-10`}>
      <h1 className="text text_type_main-large" style={{display: `${display}`}}>Лента заказов</h1>
      <ul className={`${styles.feeditems__container}`}>
        {orders.map((order) => (
          <li key={order._id}>
            <OrdersFeedItem order={order} display={"none"} />
          </li>
        ))}
      </ul>
    </section>
  );
}
