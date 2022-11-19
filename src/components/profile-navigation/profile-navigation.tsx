import styles from "./profile-navigation.module.css";
import {NavLink, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../services/actions/auth";
import {FC} from "react";
import {deleteCookie} from "../../utils/utils";
import {match} from "react-router-dom";

type TMatch = {
    match: match,
}

export const ProfileNavigation: FC<TMatch> = ({match}) => {
    const dispatch = useDispatch();
    const history = useHistory();


    const signOut = () => {
        dispatch(logout('refreshToken'));
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
        history.push('/login');
    };

    return (
        <div className={styles.content}>
            <NavLink
                to={match.url}
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link__active}
                exact
            >
                Профиль
            </NavLink>
            <NavLink
                to={`${match.url}/orders`}
                className={`${styles.link} text text_type_main-medium`}
                activeClassName={styles.link__active}
                exact
            >
                История заказов
            </NavLink>
            <button
                className={`${styles.logout__btn} text text_type_main-medium`}
                onClick={() => {
                    signOut();
                }}
            >
                Выход
            </button>
            <p className={`${styles.text} text text_type_main-small`}>
                В этом разделе вы можете <br/> изменить свои персональные данные
            </p>
        </div>
    );
}
