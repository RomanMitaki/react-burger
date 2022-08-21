import React from "react";
import styles from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";

export function ProfileNavigation() {
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
      <NavLink
        to="/"
        className={`${styles.link} text text_type_main-medium`}
        activeClassName={styles.link__active}
        exact
      >
        Выход
      </NavLink>
      <p className={`${styles.text} text text_type_main-small`}>
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </div>
  );
}
