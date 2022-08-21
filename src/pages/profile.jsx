import React from "react";
import styles from "./profile.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Switch, Route } from "react-router-dom";
import { ProfileNavigation } from "../components/profile-navigation/profile-navigation";
import { ProfileInfo } from "../components/profile-info/profile-info";

export function Profile() {
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Route path="/">
          <ProfileNavigation />
          <Switch>
            <Route path='/profile'>
              <ProfileInfo />
            </Route>
          </Switch>
        </Route>
      </main>
    </div>
  );
}
