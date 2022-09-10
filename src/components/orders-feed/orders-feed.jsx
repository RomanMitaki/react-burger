import styles from "./orders-feed.module.css";

export default function OrdersFeed() {
  return (
    <section className={`${styles.section} mt-10`}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
    </section>
  );
}
