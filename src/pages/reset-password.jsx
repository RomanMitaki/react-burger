import styles from "./reset-password.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { resetPasswordRequest } from "../utils/api";
import { useSelector } from "react-redux";
import { useForm } from "../services/hooks/useForm";

export function ResetPassword() {
  const { values, handleChange, setValues } = useForm({});
  const auth = useSelector((state) => state.auth.auth);
  const updatePasswordStatus = useSelector(
    (state) => state.auth.updatePasswordStatus
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPasswordRequest(values).then((res) =>
      setValues({ ...values, result: res.success })
    );

    setValues({ ...values, password: "", verCode: "" });
  };

  if (values.result === true) {
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
            value={values.password || ""}
            name={"password"}
            onChange={handleChange}
          />
          <Input
            placeholder="Введите код из письма"
            type="text"
            value={values.verCode || ""}
            name={"verCode"}
            onChange={handleChange}
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
