import { useEffect } from "react";
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
  Profile,
} from "../../pages";
import { Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-route.jsx";
import { getUser } from "../../services/actions/auth.js";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
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
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </>
  );
}
