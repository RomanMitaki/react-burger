import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import icon from "../../images/popup-done.png";

export default function BurgerConstructor(props) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <section className={`${styles.section} mt-25 pl-4 pr-4`}>
      <div className={`${styles.constructorEl__container} pl-8`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${props.data[0].name} (верх)`}
          price={props.data[0].price}
          thumbnail={props.data[0].image_mobile}
        />
      </div>
      <div className={`${styles.constructorEl__container_main} mt-4`}>
        <ul className={styles.constructorEl__list}>
          <li className={`${styles.constructorEl} mb-4`}>
            <button className={styles.constructor__dragBtn}>
              <DragIcon type="primary" />
            </button>
            <ConstructorElement
              text={props.data[5].name}
              price={props.data[5].price}
              thumbnail={props.data[5].image_mobile}
            />
          </li>
          <li className={`${styles.constructorEl} mb-4`}>
            <button className={styles.constructor__dragBtn}>
              <DragIcon type="primary" />
            </button>
            <ConstructorElement
              text={props.data[4].name}
              price={props.data[4].price}
              thumbnail={props.data[4].image_mobile}
            />
          </li>
          <li className={`${styles.constructorEl} mb-4`}>
            <button className={styles.constructor__dragBtn}>
              <DragIcon type="primary" />
            </button>
            <ConstructorElement
              text={props.data[7].name}
              price={props.data[7].price}
              thumbnail={props.data[7].image_mobile}
            />
          </li>
          <li className={`${styles.constructorEl} mb-4`}>
            <button className={styles.constructor__dragBtn}>
              <DragIcon type="primary" />
            </button>
            <ConstructorElement
              text={props.data[8].name}
              price={props.data[8].price}
              thumbnail={props.data[8].image_mobile}
            />
          </li>
          <li className={`${styles.constructorEl} mb-4`}>
            <button className={styles.constructor__dragBtn}>
              <DragIcon type="primary" />
            </button>
            <ConstructorElement
              text={props.data[8].name}
              price={props.data[8].price}
              thumbnail={props.data[8].image_mobile}
            />
          </li>
        </ul>
      </div>
      <div className={`${styles.constructorEl__container} pl-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${props.data[0].name} (низ)`}
          price={props.data[0].price}
          thumbnail={props.data[0].image_mobile}
        />
      </div>
      <div>
        <div className={`${styles.constructor__price_container}`}>
          <p
            className={`${styles.constructor__price} text text_type_main-large`}
          >
            {props.data[0].price * 2 +
              props.data[8].price * 2 +
              props.data[7].price +
              props.data[4].price +
              props.data[5].price}
          </p>
          <CurrencyIcon type="primary" />
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setIsOpened(true);
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal
        onClose={() => {
          setIsOpened(false);
        }}
        isOpened={isOpened}
      >
        {" "}
        <OrderDetails
          orderId={"034536"}
          statusIcon={icon}
          status={{
            p1: "Ваш заказ начали готовить",
            p2: "Дождитесь готовности на орбитальной станции",
          }}
        />
      </Modal>
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      __v: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};
