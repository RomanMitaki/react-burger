import {TypedUseSelectorHook} from "react-redux";
import {useSelector as selectorHook} from "react-redux/es/hooks/useSelector";
import {RootState} from "../../index";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
