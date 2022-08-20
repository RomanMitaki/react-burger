import React from "react";
import styles from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function Register() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <form className={styles.form} action="" method="post">
          <h1 className={`${styles.header}`}>Регистрация</h1>
          <Input  placeholder={'Имя'}/>
          <EmailInput name={"email"} />
          <PasswordInput />
          <Button>Зарегистрироваться</Button>
        </form>
        <p className={`${styles.paragraph} text text_type_main-default`}>
          Уже зарегистрированы?
          <span>
            <Link to='/login' className={`${styles.link}`}> Войти</Link>
          </span>
        </p>
      </main>
    </div>
  );
}
