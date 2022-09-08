import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export function ProtectedRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.auth.auth);
  const location = useLocation();

  return (
    <Route
      {...rest}
      exact
      render={() => (auth ? children : <Redirect to={{ pathname: "/login", state: { from: location } }} />)}
    />
  );
}
