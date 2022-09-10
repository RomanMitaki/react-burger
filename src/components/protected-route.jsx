import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getCookie } from "../utils/utils";

export function ProtectedRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.auth.auth);
  const location = useLocation();
  const cookie = getCookie("accessToken") !== undefined;
 

  return (
    <Route
      {...rest}
      exact
      render={() => (cookie ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />)}
    />
  );
}
