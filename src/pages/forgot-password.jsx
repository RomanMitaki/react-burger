import { useState } from "react";
import styles from "./forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { forgotPasswordRequest } from "../utils/api";

export function ForgotPassword() {
  const [email, setEmail] = useState({
    email: "",
    result: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordRequest(email).then((res) =>
      setEmail({ ...email, result: res.success })
    );

    setEmail({ ...email, email: "" });
  };

  if (email.result === true) {
    return <Redirect to="/reset-password" />;
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <h1 className={`${styles.header}`}>Восстановление пароля</h1>
          <EmailInput
            name={"email"}
            value={email.email}
            onChange={(event) =>
              setEmail({ ...email, email: event.target.value })
            }
          />
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
