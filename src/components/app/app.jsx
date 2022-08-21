import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Login,
  Home,
  Register,
  ForgotPassword,
  ResetPassword,
  Page404,
  Profile
} from "../../pages";
import { Switch, Route } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      <AppHeader />
      <Switch>
        <Route path="/" exact>
          <DndProvider backend={HTML5Backend}>
            <Home />
          </DndProvider>
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}
