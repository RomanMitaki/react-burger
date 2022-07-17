import React, { useEffect } from "react";
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
import { useContext, useReducer } from "react";
import { IngredientsContext } from "../app/app";

export default function BurgerConstructor() {
  const data = useContext(IngredientsContext);
  const [isOpened, setIsOpened] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [currentIngredients, setCurrentIngredients] = React.useState([]);
  const [totalPrice, dispatch] = useReducer(reducer, 0);

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
    dispatch(currentData);
  }, []);

  useEffect(() => {
    setCurrentIngredients([...currentIngredients, currentData]);
  }, []);

  const ingredientsId = currentData.map((ingredient) => {
    return (ingredient = ingredient._id);
  });

  const getOrder = (ingredientsId) => {
    return fetch("https://norma.nomoreparties.space/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    }).then(function (res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
  };

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
