import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../state/reducers";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
