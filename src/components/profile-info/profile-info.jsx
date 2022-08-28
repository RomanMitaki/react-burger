import styles from "./profile-info.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../services/actions/auth";

export function ProfileInfo() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const { name: storeName, email: storeEmail } = useSelector(
    (state) => state.auth.userInfo
  );
  const [userInfo, setUserInfo] = useState({
    holderEmail: "Логин",
    password: "",
    holderName: "Имя",
    email: "",
    name: "",
  });

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      holderEmail: storeEmail,
      holderName: storeName,
    });
  }, [storeName, storeEmail]);

  useEffect(() => {
    if (!auth) {
      setUserInfo({
        holderEmail: "Логин",
        password: "",
        holderName: "Имя",
        email: "",
        name: "",
      });
    }
  }, [auth]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(userInfo));
    setUserInfo({
      holderEmail: storeEmail,
      password: "",
      holderName: storeName,
      email: "",
      name: "",
    });
  };

  const declineUpdate = () => {
    setUserInfo({
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
        placeholder={userInfo.holderName}
        icon={"EditIcon"}
        value={userInfo.name}
        name={"name"}
        onChange={(event) =>
          setUserInfo({ ...userInfo, name: event.target.value })
        }
      />

      <Input
        type={"email"}
        placeholder={userInfo.holderEmail}
        icon={"EditIcon"}
        value={userInfo.email}
        name={"email"}
        onChange={(event) =>
          setUserInfo({ ...userInfo, email: event.target.value })
        }
      />

      <Input
        type={"password"}
        placeholder={"Пароль"}
        icon={"EditIcon"}
        value={userInfo.password}
        name={"password"}
        onChange={(event) =>
          setUserInfo({ ...userInfo, password: event.target.value })
        }
      />
      {userInfo.email.length > 0 &&
        userInfo.name.length > 0 &&
        userInfo.password.length > 0 && (
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
