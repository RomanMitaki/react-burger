import { useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import { useDispatch, useSelector } from "react-redux";
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
  IngredientDetailsPage,
} from "../../pages";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route.jsx";
import { getUser } from "../../services/actions/auth.js";
import Modal from "../modal/modal.jsx";
import { CLEAR_INGREDIENT_DETAILS } from "../../services/actions/ingredient-details.js";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, []);

  const modalStatus = useSelector((store) => store.ingredientDetails.isOpened);
  const ingredientDetails = useSelector(
    (store) => store.ingredientDetails.ingredientDetails
  );

  const onClose = () => {
    dispatch({ type: CLEAR_INGREDIENT_DETAILS });
  };

  let background = location.state && location.state.background;
  console.log(location);
  console.log(background);

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
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientDetailsPage />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal onClose={onClose} isOpened={modalStatus}>
            <IngredientDetails data={ingredientDetails} />
          </Modal>
        </Route>
      )}
    </>
  );
}
