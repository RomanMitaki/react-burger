import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { signIn } from "../services/actions/auth";

export function Login() {
  const dispatch = useDispatch();
  const auth = useSelector(
    (state) => state.auth.auth
  );
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(loginData));
    setLoginData({ email: "", password: "" });
  };

  if (auth) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <h1 className={`${styles.header}`}>Вход</h1>

          <EmailInput
            name={"email"}
            value={loginData.email}
            onChange={(event) =>
              setLoginData({ ...loginData, email: event.target.value })
            }
          />
          <PasswordInput
            value={loginData.password}
            name={"password"}
            onChange={(event) =>
              setLoginData({ ...loginData, password: event.target.value })
            }
          />
          <Button>Войти</Button>
        </form>
        <p className={`${styles.paragraph} pb-4 text text_type_main-default`}>
          Вы — новый пользователь?
          <span>
            <Link to="/register" className={`${styles.link}`}>
              {" "}
              Зарегистрироваться
            </Link>
          </span>
        </p>
        <p className={`${styles.paragraph} text text_type_main-default`}>
          Забыли пароль?
          <span>
            <Link to="/forgot-password" className={`${styles.link}`}>
              {" "}
              Восстановить пароль
            </Link>
          </span>
        </p>
      </main>
    </div>
  );
}
