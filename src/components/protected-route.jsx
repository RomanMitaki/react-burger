import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.auth.auth);

  return (
    <Route
      {...rest}
      exact
      render={() => (auth ? children : <Redirect to="/login" />)}
    />
  );
}
