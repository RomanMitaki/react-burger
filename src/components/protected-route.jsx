import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  
  
    return <Route {...rest} render={() => children} />;
}
