import styles from "./profile.module.css";
import { Switch, Route } from "react-router-dom";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";
import { ProfileInfo } from "../components/profile-info/profile-info";
import OrdersFeed from "../components/orders-feed/orders-feed";
import { useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  wsConnectionAuthStart,
  wsConnectionClosed,
  wsConnectionStart,
} from "../services/actions/wsActions";

export function Profile() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(wsConnectionAuthStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <ProfileNavigation match={match} />
        <Switch>
          <Route path={match.path} exact>
            <ProfileInfo />
          </Route>
          <Route path={`${match.path}/orders`} exact>
            <OrdersFeed display={"none"} status={'block'} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
