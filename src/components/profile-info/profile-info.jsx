import styles from "./profile-info.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../services/actions/auth";
import { useForm } from "../../services/hooks/useForm";

export function ProfileInfo() {
  const { values, handleChange, setValues } = useForm({});
  const dispatch = useDispatch();
  const { name: storeName, email: storeEmail } = useSelector(
    (state) => state.auth.userInfo
  );

  useEffect(() => {
    setValues({
      ...values,
      holderEmail: storeEmail,
      holderName: storeName,
    });
  }, [storeName, storeEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(values));
    setValues({
      holderEmail: storeEmail,
      password: "",
      holderName: storeName,
      email: "",
      name: "",
    });
  };

  const declineUpdate = () => {
    setValues({
      holderEmail: storeEmail,
      password: "",
      holderName: storeName,
      email: "",
      name: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={values.holderName || ""}
        icon={"EditIcon"}
        value={values.name || ""}
        name={"name"}
        onChange={handleChange}
      />

      <Input
        type={"email"}
        placeholder={values.holderEmail || ""}
        icon={"EditIcon"}
        value={values.email || ""}
        name={"email"}
        onChange={handleChange}
      />

      <Input
        type={"password"}
        placeholder={"Пароль"}
        icon={"EditIcon"}
        value={values.password || ""}
        name={"password"}
        onChange={handleChange}
      />
      {values.email &&
        values.name &&
        values.password &&
        values.email.length > 0 &&
        values.name.length > 0 &&
        values.password.length > 0 && (
          <div className={styles.btns__container}>
            <Button
              type="secondary"
              size="medium"
              onClick={() => declineUpdate()}
            >
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
    </form>
  );
}
