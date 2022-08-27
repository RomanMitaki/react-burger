import styles from "./profile-info.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUserInfo, refreshTokenRequest } from "../../utils/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setCookie } from "../../utils/utils";

export function ProfileInfo() {
  const auth = useSelector((state) => state.auth.auth);
  const [userInfo, setUserInfo] = useState({
    email: "Логин",
    password: "",
    name: "Имя",
  });

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        if (res.success === true) {
          setUserInfo({
            ...userInfo,
            email: res.user.email,
            name: res.user.name,
          });
        }
        if (res.success === false) {
          refreshTokenRequest().then((res) => {
            let accessToken = res.accessToken.split("Bearer ")[1];
            if (accessToken) {
              setCookie("accessToken", accessToken);
            }
            getUserInfo().then((res) => {
              setUserInfo({
                ...userInfo,
                email: res.user.email,
                name: res.user.name,
              });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!auth) {
      setUserInfo({ email: "Логин", password: "", name: "Имя" });
    }
  }, [auth]);

  return (
    <form className={styles.form}>
      <Input type={"text"} placeholder={userInfo.name} icon={"EditIcon"} />

      <Input type={"email"} placeholder={userInfo.email} icon={"EditIcon"} />

      <Input type={"password"} placeholder={"Пароль"} icon={"EditIcon"} />
    </form>
  );
}
