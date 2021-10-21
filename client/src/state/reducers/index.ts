import { combineReducers } from "redux";
import {
  forgotPasswordReducer,
  getProfileReducer,
  loginReducer,
  registerReducer,
  resetPasswordReducer,
  updateProfileReducer,
} from "./userReducer";

export const reducers = combineReducers({
  loginUser: loginReducer,
  register: registerReducer,
  getProfile: getProfileReducer,
  updateProfile: updateProfileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});

export type RootState = ReturnType<typeof reducers>;
