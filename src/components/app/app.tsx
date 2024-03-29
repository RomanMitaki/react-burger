import {useEffect} from "react";
import AppHeader from "../app-header/app-header";
import {useDispatch} from "../../services/hooks/useDispatch";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {
    Login,
    Home,
    Register,
    ForgotPassword,
    ResetPassword,
    Page404,
    Profile,
    IngredientDetailsPage,
    Feed,
    FeedOrderId,
} from "../../pages";
import {Switch, Route, useHistory, useLocation} from "react-router-dom";
import {ProtectedRoute} from "../protected-route";
import {getUser} from "../../services/actions/auth";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {TLocation} from "../../utils/types";

export default function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<TLocation>();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUser());
        history.replace({state: null});
    }, [dispatch, history]);

    const onClose = () => {
        history.goBack();
    };

    const background = location.state && location.state.background;

    return (
        <>
            <AppHeader/>
            <Switch location={background || location}>
                <Route path="/" exact>
                    <DndProvider backend={HTML5Backend}>
                        <Home/>
                    </DndProvider>
                </Route>
                <Route path="/login" exact>
                    <Login/>
                </Route>
                <Route path="/register" exact>
                    <Register/>
                </Route>
                <Route path="/forgot-password" exact>
                    <ForgotPassword/>
                </Route>
                <Route path="/reset-password" exact>
                    <ResetPassword/>
                </Route>
                <ProtectedRoute path="/profile">
                    <Profile/>
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact>
                    <IngredientDetailsPage/>
                </Route>
                <Route path="/feed" exact>
                    <Feed/>
                </Route>
                <Route path="/feed/:id" exact>
                    <FeedOrderId textAlign={"center"}/>
                </Route>
                <Route>
                    <Page404/>
                </Route>
            </Switch>
            {background && (
                <>
                    <Route path="/ingredients/:id">
                        <Modal onClose={onClose} isOpened={true}>
                            <IngredientDetails/>
                        </Modal>
                    </Route>
                    <Route path="/feed/:id">
                        <Modal onClose={onClose} isOpened={true}>
                            <FeedOrderId textAlign={"left"}/>
                        </Modal>
                    </Route>
                    <ProtectedRoute path="/profile/orders/:id" exact>
                        <Modal onClose={onClose} isOpened={true}>
                            <FeedOrderId textAlign={"left"}/>
                        </Modal>
                    </ProtectedRoute>
                </>
            )}
        </>
    );
}
