import styles from "./feed.module.css";
import OrdersFeed from "../components/orders-feed/orders-feed";
import OrdersInfo from "../components/orders-info/orders-info";

export function Feed() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
       
        <OrdersFeed />
        <OrdersInfo />
      </main>
    </div>
  );
}
