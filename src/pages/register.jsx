import { useState } from "react";
import styles from "./register.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registerRequest } from "../utils/api";

export function Register() {
  const [regFormData, setRegFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerRequest(regFormData);
    setRegFormData({ email: "", password: "", name: "" });
  };

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <h1 className={`${styles.header}`}>Регистрация</h1>
          <Input
            placeholder={"Имя"}
            value={regFormData.name}
            type={"text"}
            name={"name"}
            onChange={(event) =>
              setRegFormData({ ...regFormData, name: event.target.value })
            }
          />
          <EmailInput
            name={"email"}
            value={regFormData.email}
            onChange={(event) =>
              setRegFormData({ ...regFormData, email: event.target.value })
            }
          />
          <PasswordInput
            value={regFormData.password}
            name={"password"}
            onChange={(event) =>
              setRegFormData({ ...regFormData, password: event.target.value })
            }
          />
          <Button>Зарегистрироваться</Button>
        </form>
        <p className={`${styles.paragraph} text text_type_main-default`}>
          Уже зарегистрированы?
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
