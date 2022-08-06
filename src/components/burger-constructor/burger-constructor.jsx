import React from "react";
import { useEffect, useReducer } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import BurgerFilling from "./burger-filling/burger-filling";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_ORDER_DETAILS,
  CLEAR_ORDER_DETAILS,
} from "../../services/actions/order-details";
import { getNumberOfOrder } from "../../services/actions/order-details";
import { useDrop, useDrag } from "react-dnd";
import {
  setCurrentIngredients,
  deleteIngredient,
} from "../../services/actions/burger-constructor";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const currentData = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );
  const modalStatus = useSelector((store) => store.orderDetails.isOpened);

  //totalPrice
  const [totalPrice, dispatcher] = useReducer(reducer, 0);

  function reducer(totalPrice, action) {
    const total = action.reduce((acc, element) => {
      if (element.type === "bun") {
        acc += 2 * element.price;
      } else {
        acc += element.price;
      }
      return acc;
    }, 0);
    return total;
  }

  useEffect(() => {
    dispatcher(currentData);
  }, [currentData]);

  //getOrderNumber and orderDetails
  const ingredientsId = currentData.map((ingredient) => {
    return (ingredient = ingredient._id);
  });

  const setOrderDetails = () => {
    dispatch({ type: SET_ORDER_DETAILS });
  };

  //handlers
  const onDropHandler = (item) => {
    dispatch(setCurrentIngredients(item));
  };

  const deleteHandler = (ingredient) => {
    dispatch(deleteIngredient(ingredient));
  };

  //dnd
  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "#4c4cff90" : "transparent";

  //modal
  const onClose = () => {
    dispatch({ type: CLEAR_ORDER_DETAILS });
  };

  return (
    <section
      className={`${styles.section} mt-25 pl-4 pr-4`}
      ref={dropTarget}
      style={{ borderColor }}
    >
      <div className={`${styles.constructorEl__container} pl-8`}>
        {currentData.length ? (
          currentData.map((ingredient) => {
            if (ingredient.type === "bun") {
              return (
                <ConstructorElement
                  key={ingredient.uniqueId}
                  type="top"
                  isLocked={true}
                  text={`${ingredient.name} (верх)`}
                  price={ingredient.price}
                  thumbnail={ingredient.image_mobile}
                />
              );
            }
          })
        ) : (
          <p className="text text_type_main-large"></p>
        )}
      </div>

      <div className={`${styles.constructorEl__container_main} mt-4`}>
        {currentData.length ? (
          <ul className={styles.constructorEl__list}>
            {currentData.map((ingredient, index) => {
              if (ingredient.type !== "bun") {
                return (
                  <BurgerFilling
                    ingredient={ingredient}
                    deleteHandler={() => deleteHandler(ingredient)}
                    key={ingredient.uniqueId}
                    index={index}
                  />
                );
              }
            })}
          </ul>
        ) : (
          <p className="text text_type_main-medium">
            Переместите булочку, соусы и начинки
          </p>
        )}
      </div>

      <div className={`${styles.constructorEl__container} pl-8`}>
        {currentData.length ? (
          currentData.map((ingredient) => {
            if (ingredient.type === "bun") {
              return (
                <ConstructorElement
                  key={ingredient.uniqueId}
                  type="bottom"
                  isLocked={true}
                  text={`${ingredient.name} (верх)`}
                  price={ingredient.price}
                  thumbnail={ingredient.image_mobile}
                />
              );
            }
          })
        ) : (
          <p className="text text_type_main-large"></p>
        )}
      </div>

      <div className={`${styles.constructor__price_container}`}>
        <p className={`${styles.constructor__price} text text_type_main-large`}>
          {totalPrice}
        </p>
        <CurrencyIcon type="primary" />
        <Button
          type="primary"
          size="large"
          onClick={() => {
            dispatch(getNumberOfOrder(ingredientsId));
            setOrderDetails();
          }}
        >
          Оформить заказ
        </Button>
      </div>

      <Modal onClose={onClose} isOpened={modalStatus}>
        <OrderDetails />
      </Modal>
    </section>
  );
}
