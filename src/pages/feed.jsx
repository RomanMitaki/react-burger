import styles from "./feed.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersFeed from "../components/orders-feed/orders-feed";
import OrdersInfo from "../components/orders-info/orders-info";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";


export function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <OrdersFeed display = {'block'}/>
        <OrdersInfo />
      </main>
    </div>
  );
}
