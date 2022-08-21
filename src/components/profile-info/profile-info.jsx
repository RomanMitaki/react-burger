import React from "react";
import styles from "./profile-info.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfileInfo() {
  return (
    <form className={styles.form}>
      <Input type={"text"} placeholder={"Имя"} icon={"EditIcon"} />

      <Input type={"email"} placeholder={"Логин"} icon={"EditIcon"} />

      <Input type={"password"} placeholder={"Пароль"} icon={"EditIcon"} />
    </form>
  );
}
