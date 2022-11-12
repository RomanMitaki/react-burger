import React from "react";
import styles from "./page404.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function Page404() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <h1 className={`${styles.header}`}>404 - Страница не найдена</h1>
        <p className={`${styles.paragraph} text text_type_main-default`}>
          Вернуться на
          <span>
            <Link to="/" className={`${styles.link}`}>
              {" "}
              главную страницу
            </Link>
          </span>
        </p>
      </main>
    </div>
  );
}
