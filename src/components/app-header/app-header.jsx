import React from "react";
import styles from "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderNavElement from "../header-nav-element/header-nav-element.jsx";
import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav>
        <ul className={`${styles.nav__list}`}>
          <HeaderNavElement
            text="Конструктор"
            typography="text text_type_main-default"
            href="/"
          >
            <BurgerIcon type="secondary" />
          </HeaderNavElement>
          <HeaderNavElement
            text="Лента заказов"
            typography="text text_type_main-default"
            href="/feed"
          >
            <ListIcon type="secondary" />
          </HeaderNavElement>
        </ul>
      </nav>
      <Link to={'/'} className={styles.logo__container}>
        <Logo />
      </Link>
      <nav>
        <ul className={`${styles.nav__list}`}>
          <HeaderNavElement
            text="Личный кабинет"
            typography="text text_type_main-default"
            href="/profile"
          >
            <ProfileIcon type="secondary" />
          </HeaderNavElement>
        </ul>
      </nav>
    </header>
  );
}
