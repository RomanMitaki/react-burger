import { useState } from "react";
import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { resetPasswordRequest } from "../utils/api";
import { useSelector } from "react-redux";

export function ResetPassword() {
  const auth = useSelector(
    (state) => state.auth.auth
  );
  const updatePasswordStatus = useSelector((state) => state.auth.updatePasswordStatus);
  const [password, setPassword] = useState({
    password: "",
    verCode: "",
    result: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPasswordRequest(password).then((res) =>
      setPassword({ ...password, result: res.success })
    );

    setPassword({ ...password, password: "", verCode: "" });
  };

  if (password.result === true) {
    return <Redirect to="/login" />;
  }

  if (auth) {
    return <Redirect to="/" />;
  }

  if (!updatePasswordStatus) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <h1 className={`${styles.header}`}>Восстановление пароля</h1>
          <PasswordInput
            value={password.password}
            name={"password"}
            onChange={(event) =>
              setPassword({ ...password, password: event.target.value })
            }
          />
          <Input
            placeholder="Введите код из письма"
            type="text"
            value={password.checkCode}
            name={"verCode"}
            onChange={(event) =>
              setPassword({ ...password, verCode: event.target.value })
            }
          />
          <Button>Сохранить</Button>
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
