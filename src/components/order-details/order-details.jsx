import { useSelector, useDispatch } from "react-redux";
import styles from "./order-details.module.css";


export default function OrderDetails() {
  
  const { orderId, statusIcon, status } = useSelector(
    (store) => store.orderDetails.orderDetails
  );
  const { orderNumberRequest, orderNumberFailed } = useSelector(
    (store) => store.orderDetails
  );

  return (
    <div
      className={`${styles.popup__container_type_orderDetails} mt-30 mb-30 mr-100 ml-100`}
    >
      <h2 className={`${styles.popup__header} text text_type_digits-large`}>
        {orderNumberRequest && "Загрузка..."}{" "}
        {orderNumberFailed && "Ошибка загрузки"}{" "}
        {!orderNumberRequest && !orderNumberFailed && orderId}
      </h2>
      <p
        className={`${styles.popup__subTitle} text text_type_main-default mt-8 mb-15`}
      >
        идентификатор заказа
      </p>
      <img className={styles.popupImg} src={statusIcon} alt="icon" />
      <p className={`${styles.status__text} text text_type_main-default`}>
        {status.p1}
      </p>
      <p
        className={`${styles.status__text} text text_type_main-default text_color_inactive`}
      >
        {status.p2}
      </p>
    </div>
  );
}
