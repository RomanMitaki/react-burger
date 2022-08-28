import styles from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/actions/auth";
import { useHistory } from "react-router-dom";
import { deleteCookie } from "../../utils/utils";
import { useEffect } from "react";

export function ProfileNavigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth.auth);

  const signOut = () => {
    dispatch(logout());
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
  };

  useEffect(() => {
    if (!auth) {
      history.replace({ pathname: "/login" });
      deleteCookie("refreshToken");
      deleteCookie("accessToken");
    }
  }, [auth]);

  

  return (
    <div className={styles.content}>
      <NavLink
        to="/profile"
        className={`${styles.link} text text_type_main-medium`}
        activeClassName={styles.link__active}
        exact
      >
        Профиль
      </NavLink>
      <NavLink
        to="/"
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
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </div>
  );
}
