import {FC, ReactElement} from "react";
import {Route, Redirect} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {getCookie} from "../utils/utils";

type TProtectedRoute = {
    children: ReactElement,
    path: string,
    exact?: boolean
}

export const ProtectedRoute: FC<TProtectedRoute> = ({children, ...rest}) => {
    const location = useLocation();
    let cookie = getCookie("accessToken") !== undefined;
    return (
        <Route
            {...rest}
            render={() =>
                cookie ? (
                    children
                ) : (
                    <Redirect to={{pathname: "/login", state: {from: location}}}/>
                )
            }
        />
    );
}
