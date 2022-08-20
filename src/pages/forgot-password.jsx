import React from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <form className={styles.form} action="" method="post">
          <h1 className={`${styles.header}`}>Восстановление пароля</h1>
          <EmailInput name={"email"} />
          <Button>Восстановить</Button>
        </form>
        <p className={`${styles.paragraph} text text_type_main-default`}>
          Вспомнили пароль?
          <span>
            <Link to="/login" className={`${styles.link}`}>
              {" "}
              Войти
            </Link>
          </span>
        </p>
      </main>
    </div>
  );
}
