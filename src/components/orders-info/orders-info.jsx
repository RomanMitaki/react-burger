import styles from "./orders-info.module.css";

export default function OrdersInfo() {
  return (
    <div className={styles.section}>
      <div className={styles.status__container}>
        <div className={styles.status__container_orders}>
          <p className={`${styles.status__text} text text_type_main-medium`}>Готовы:</p>
          <ul className={`${styles.orders__list} text text_type_digits-default`} style={{color: "#00CCCC"}}>
            <li className="mb-2">034533</li>
            <li className="mb-2">034533</li>
            <li className="mb-2">034533</li>
            <li className="mb-2">034533</li>
            <li className="mb-2">034533</li>
          </ul>
        </div>
        <div className={styles.status__container_orders}>
          <p className={`${styles.status__text} text text_type_main-medium`}>В работе:</p>
          <ul className={`${styles.orders__list} text text_type_digits-default`}>
            <li className="mb-2">034533</li>
            <li className="mb-2">034533</li>
            <li className="mb-2">034533</li>
          </ul>
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className="text text_type_digits-large mb-15">28 752</p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">138</p>
    </div>
  );
}
