import styles from "./feed-order-id.module.css";
import OrderIdFeedItem from "../components/order-id-feed-item/order-id-feed-item";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { formatDate } from "../utils/format-date";
import { useMemo } from "react";
import { wsConnectionStart } from "../services/actions/wsActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export function FeedOrderId({ textAlign }) {
 //const dispatch = useDispatch();
 // useEffect(() => {
 //   dispatch(wsConnectionStart());
 // }, []);
  const orders = useSelector((store) => store.wsOrders.orders);
  //console.log(orders);
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );
  const { id } = useParams();

  const order = orders?.find(({ _id }) => _id === id);

  const countedOrderIngredients = order.ingredients.reduce(
    (acc, ingredient) => {
      if (!acc[ingredient]) {
        acc[ingredient] = 1;
      } else {
        acc[ingredient] += 1;
      }
      return acc;
    },
    {}
  );

  const filteredOrderIngredients = Object.keys(countedOrderIngredients);

  const selectedIngredients = filteredOrderIngredients.reduce(
    (acc, ingredient) => {
      for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i]._id === ingredient) {
          const uniqueId = nanoid();
          acc.push({
            _id: ingredients[i]._id,
            price: ingredients[i].price,
            image: ingredients[i].image,
            name: ingredients[i].name,
            nanoId: uniqueId,
            quantity: countedOrderIngredients[ingredient],
          });
        }
      }
      return acc;
    },
    []
  );
  console.log(selectedIngredients);
  const totalPrice = useMemo(() => {
    return selectedIngredients.reduce((acc, element) => {
      acc += element.price * element.quantity;

      return acc;
    }, 0);
  }, [selectedIngredients]);

  

  if (!order) {
    return null;
  }

  return (
    <div className={styles.order__container}>
      <p
        className={`${styles.order__orderId} text text_type_digits-default`}
        style={{ textAlign: `${textAlign}` }}
      >
        {`#${order.number}`}
      </p>
      <h2 className={`${styles.order__header} text text_type_main-medium`}>
        {`${order.name}`}
      </h2>
      <p className={`${styles.order__status} text text_type_main-default`}>
        {`${order.status}`}
      </p>
      <p className={`${styles.order__header} text text_type_main-medium`}>
        Состав:
      </p>
      <ul className={styles.orderIngredients__list}>
        {selectedIngredients.map((ingredient) => (
          <li key={ingredient.nanoId}>
            <OrderIdFeedItem
              selectedIngredients={selectedIngredients}
              ingredient={ingredient}
            />
          </li>
        ))}
      </ul>
      <div className={styles.orderIngredients__dateAndPrice_container}>
        <p className={`${styles.order__date} text text_type_main-default`}>
          {`${formatDate(order.updatedAt)}`}
        </p>
        <div className={`${styles.order__price_container}`}>
          <p className={`${styles.order__price} text text_type_digits-default`}>
            {totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
