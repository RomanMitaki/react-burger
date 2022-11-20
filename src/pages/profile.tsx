import styles from "./profile.module.css";
import {Switch, Route} from "react-router-dom";
import {ProfileNavigation} from "../components/profile-navigation/profile-navigation";
import {ProfileInfo} from "../components/profile-info/profile-info";
import OrdersFeed from "../components/orders-feed/orders-feed";
import {useRouteMatch, useLocation} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "../services/hooks/useDispatch";
import {
    wsConnectionAuthStart,
    wsConnectionClosed,
} from "../services/actions/wsActions";
import {FeedOrderId} from "./feed-order-id";
import {TLocation} from "../utils/types";

export function Profile() {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const location = useLocation<TLocation>();
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(wsConnectionAuthStart());
        return () => {
            dispatch(wsConnectionClosed());
        };
    }, [dispatch]);

    return (
        <div className={styles.page}>
            <Switch location={background || location}>
                <Route path={`${match.path}/orders/:id`} exact>
                    <FeedOrderId textAlign={"center"}/>
                </Route>
                <Route path={match.path}>
                    <main className={styles.content}>
                        <ProfileNavigation match={match}/>
                        <Switch location={background || location}>
                            <Route path={match.path} exact>
                                <ProfileInfo/>
                            </Route>
                            <Route path={`${match.path}/orders`} exact>
                                <OrdersFeed display={"none"} status={"block"}/>
                            </Route>
                        </Switch>
                    </main>
                </Route>
            </Switch>
        </div>
    );
}
