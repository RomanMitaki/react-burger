import React from "react";
import { useEffect, useReducer } from "react";
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
import { getOrder } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_INGREDIENTS } from "../../services/actions/burger-constructor";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.burgerIngredients.ingredients);
  const [isOpened, setIsOpened] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [totalPrice, dispatcher] = useReducer(reducer, 0);

  const currentData = [
    data[0],
    data[2],
    data[3],
    data[4],
    data[7],
    data[8],
    data[9],
    data[14],
  ];

  const ingredientsId = currentData.map((ingredient) => {
    return (ingredient = ingredient._id);
  });

  function reducer(totalPrice, action) {
    const total = action.reduce((acc, element) => {
      if (element.type === "bun") {
        acc += 2 * element.price;
      } else {
        acc += element.price;
      }
      return acc;
    }, totalPrice);
    return total;
  }

  useEffect(() => {
    dispatcher(currentData);
  }, []);

  useEffect(() => {
    dispatch({ type: SET_CURRENT_INGREDIENTS, data: currentData });
  }, []);

  const getNumberOfOrder = () => {
    getOrder(ingredientsId)
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={`${styles.section} mt-25 pl-4 pr-4`}>
      <div className={`${styles.constructorEl__container} pl-8`}>
        {currentData.map((ingredient) => {
          if (ingredient.type === "bun") {
            return (
              <ConstructorElement
                key={ingredient._id}
                type="top"
                isLocked={true}
                text={`${ingredient.name} (верх)`}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
              />
            );
          }
        })}
      </div>
      <div className={`${styles.constructorEl__container_main} mt-4`}>
        <ul className={styles.constructorEl__list}>
          {currentData.map((ingredient) => {
            if (ingredient.type !== "bun") {
              return (
                <li
                  className={`${styles.constructorEl} mb-4`}
                  key={ingredient._id}
                >
                  <button className={styles.constructor__dragBtn}>
                    <DragIcon type="primary" />
                  </button>
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div className={`${styles.constructorEl__container} pl-8`}>
        {currentData.map((ingredient) => {
          if (ingredient.type === "bun") {
            return (
              <ConstructorElement
                key={ingredient._id}
                type="bottom"
                isLocked={true}
                text={`${ingredient.name} (низ)`}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
              />
            );
          }
        })}
      </div>
      <div>
        <div className={`${styles.constructor__price_container}`}>
          <p
            className={`${styles.constructor__price} text text_type_main-large`}
          >
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
          <Button
            type="primary"
            size="large"
            onClick={() => {
              getOrder(ingredientsId);
              getNumberOfOrder();
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
          orderId={orderNumber}
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
