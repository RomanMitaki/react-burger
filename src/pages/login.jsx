import React from "react";
import styles from "./login.module.css";

import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <form className={styles.form} action="" method="post">
          <h1 className={`${styles.header}`}>Вход</h1>

          <EmailInput name={"email"} />
          <PasswordInput />
          <Button>Войти</Button>
        </form>
        <p className={`${styles.paragraph} pb-4 text text_type_main-default`}>
          Вы — новый пользователь?
          <span>
            <Link className={`${styles.link}`}> Зарегистрироваться</Link>
          </span>
        </p>
        <p className={`${styles.paragraph} text text_type_main-default`}>
          Забыли пароль?
          <span>
            <Link className={`${styles.link}`}> Восстановить пароль</Link>
          </span>
        </p>
      </main>
    </div>
  );
}
