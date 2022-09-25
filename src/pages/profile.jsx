import styles from "./profile.module.css";
import { Switch, Route } from "react-router-dom";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";
import { ProfileInfo } from "../components/profile-info/profile-info";
import OrdersFeed from "../components/orders-feed/orders-feed";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  wsConnectionAuthStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
//import { getCookie } from "../utils/utils";

export function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();

  const match = useRouteMatch();
  //console.log(match);
  //console.log(url);

  useEffect(() => {
    dispatch(wsConnectionAuthStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);
  // console.log(history);
  //console.log(getCookie("accessToken"));

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <ProfileNavigation match={match}/>
        <Switch>
          <Route path={match.path} exact>
            <ProfileInfo />
          </Route>
          <Route path={`${match.path}/orders`} exact>
            <OrdersFeed />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
