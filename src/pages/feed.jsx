import styles from "./feed.module.css";
import OrdersFeed from "../components/orders-feed/orders-feed";

export function Feed() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <OrdersFeed />
      </main>
    </div>
  );
}
