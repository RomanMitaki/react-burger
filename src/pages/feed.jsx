import styles from "./feed.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersFeed from "../components/orders-feed/orders-feed";
import OrdersInfo from "../components/orders-info/orders-info";
import { wsConnectionStart } from "../services/actions/wsActions";
import { useHistory, useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

export function Feed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  useEffect(() => {
    dispatch(wsConnectionStart());
   dispatch(wsConnectionStart());
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
