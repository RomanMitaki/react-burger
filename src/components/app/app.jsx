import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Login, Home } from "../../pages";
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
        <Route path='/' exact>
          <DndProvider backend={HTML5Backend}>
            <Home />
          </DndProvider>
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
      </Switch>
    </>
  );
}


