import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";

export default function OrderDetails(props) {
  return (
    <div
      className={`${styles.popup__container_type_orderDetails} mt-30 mb-30 mr-100 ml-100`}
    >
      <h2 className={`${styles.popup__header} text text_type_digits-large`}>
        {props.orderId}
      </h2>
      <p
        className={`${styles.popup__subTitle} text text_type_main-default mt-8 mb-15`}
      >
        идентификатор заказа
      </p>
      <img className={styles.popupImg} src={props.statusIcon} alt="icon" />
      <p className={`${styles.status__text} text text_type_main-default`}>
        {props.status.p1}
      </p>
      <p
        className={`${styles.status__text} text text_type_main-default text_color_inactive`}
      >
        {props.status.p2}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  orderId: PropTypes.string.isRequired,
  statusIcon: PropTypes.string.isRequired,
  status: PropTypes.shape({
    p1: PropTypes.string.isRequired,
    p2: PropTypes.string.isRequired,
  }).isRequired,
};
