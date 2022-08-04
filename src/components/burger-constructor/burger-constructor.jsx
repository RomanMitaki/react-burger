import React from "react";
import { useEffect, useReducer } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details.jsx";
import { useDispatch, useSelector } from "react-redux";
import { SET_CURRENT_INGREDIENTS } from "../../services/actions/burger-constructor";
import {
  SET_ORDER_DETAILS,
  CLEAR_ORDER_DETAILS,
} from "../../services/actions/order-details";
import { getNumberOfOrder } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import { nanoid } from "nanoid";
import { setCurrentIngredients } from "../../services/actions/burger-constructor";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const currentData = useSelector(
    (store) => store.burgerConstructor.currentIngredients
  );
  const modalStatus = useSelector((store) => store.orderDetails.isOpened);
  const [totalPrice, dispatcher] = useReducer(reducer, 0);

  /*const ingredientsId = currentData.map((ingredient) => {
    return (ingredient = ingredient._id);
  });*/
  const onDropHandler = (item) => {
    dispatch(setCurrentIngredients(item));
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "#00cccc90" : "transparent";

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

  const onClose = () => {
    dispatch({ type: CLEAR_ORDER_DETAILS });
  };

  const setOrderDetails = () => {
    dispatch({ type: SET_ORDER_DETAILS });
  };
  /*
  useEffect(() => {
    dispatcher(currentData);
  }, []);

  useEffect(() => {
    dispatch({ type: SET_CURRENT_INGREDIENTS, data: currentData });
  }, []);*/

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
          <p className='text text_type_main-large'></p>
        )}
      </div>

      <div className={`${styles.constructorEl__container_main} mt-4`}>
        {currentData.length ? (
          <ul className={styles.constructorEl__list}>
            {currentData.map((ingredient) => {
              if (ingredient.type !== "bun") {
                return (
                  <li
                    className={`${styles.constructorEl} mb-4`}
                    key={ingredient.uniqueId}
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
        ) : (
          <p className='text text_type_main-medium'>Переместите булочку, соусы и начинки</p>
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
          <p className='text text_type_main-large'></p>
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
            /*dispatch(getNumberOfOrder(ingredientsId));*/
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

/*{currentData.map((ingredient) => {
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
</ul>*/

/*{currentData.map((ingredient) => {
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
})}*/
