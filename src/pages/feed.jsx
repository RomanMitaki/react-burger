import styles from "./feed.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersFeed from "../components/orders-feed/orders-feed";
import OrdersInfo from "../components/orders-info/orders-info";
import {
  WS_CONNECTION_START,
  wsGetMessage,
} from "../services/actions/wsActions";

export function Feed() {
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.wsConnection.orders);
  console.log(orders);
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <OrdersFeed />
        <OrdersInfo />
      </main>
    </div>
  );
}
