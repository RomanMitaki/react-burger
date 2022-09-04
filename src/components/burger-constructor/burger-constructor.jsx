import React from "react";
import { useEffect } from "react";
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
import { useDrop } from "react-dnd";
import {
  setCurrentIngredient,
  deleteIngredient,
  setTotalPrice,
} from "../../services/actions/burger-constructor";
import { useHistory } from "react-router-dom";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentIngredients: currentData, totalPrice } = useSelector(
    (store) => store.burgerConstructor
  );
  const auth = useSelector((state) => state.auth.auth);

  const makeOrder = () => {
    if (!auth) {
      history.push("/login");
    } else {
      dispatch(getNumberOfOrder(ingredientsId));
      setOrderDetails();
    }
  };

  const modalStatus = useSelector((store) => store.orderDetails.isOpened);

  //totalPrice
  useEffect(() => {
    const totalPrice = currentData.reduce((acc, element) => {
      if (element.type === "bun") {
        acc += 2 * element.price;
      } else {
        acc += element.price;
      }
      return acc;
    }, 0);
    dispatch(setTotalPrice(totalPrice));
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
    dispatch(setCurrentIngredient(item));
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
                  text={`${ingredient.name} (низ)`}
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
        {currentData.some((ingredient) => ingredient.type === "bun") ? (
          <Button type="primary" size="large" onClick={makeOrder}>
            Оформить заказ
          </Button>
        ) : (
          <Button type="primary" size="large" onClick={makeOrder} disabled>
            Оформить заказ
          </Button>
        )}
      </div>

      <Modal onClose={onClose} isOpened={modalStatus}>
        <OrderDetails />
      </Modal>
    </section>
  );
}
