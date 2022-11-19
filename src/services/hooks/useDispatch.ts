import {useDispatch as dispatchHook} from "react-redux";
import {AppDispatch, AppThunk} from "../../index";

export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();