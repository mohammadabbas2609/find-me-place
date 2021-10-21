import axios from "axios";
import { Dispatch } from "redux";
import { __FIND_ME_A_PLACE_USER } from "../constants/localStorage";
import {
  ProfileUpdateConstant,
  UserForgetPassword,
  UserLoginConstant,
  UserProfileConstant,
  UserRegisterContsant,
  UserResetPassword,
} from "../constants/userConstants";
import {
  forgotPasswordAction,
  loginAction,
  profileAction,
  profileUpdateAction,
  registerAction,
  resetPasswordAction,
} from "../types/userTypes";

export const login =
  (email: string, password: string) =>
  async (dispatch: Dispatch<loginAction>) => {
    try {
      dispatch({
        type: UserLoginConstant.USER_LOGIN_REQUEST,
      });

      const response: any = await axios.post("/api/user/login", {
        email,
        password,
      });

      dispatch({
        type: UserLoginConstant.USER_LOGIN_SUCCESS,
        payload: response.data.user,
      });

      localStorage.setItem(
        __FIND_ME_A_PLACE_USER,
        JSON.stringify(response.data.user)
      );
    } catch (error: any) {
      dispatch({
        type: UserLoginConstant.USER_LOGIN_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch<registerAction | loginAction>) => {
    try {
      dispatch({
        type: UserRegisterContsant.USER_REGISTER_REQUEST,
      });

      const response: any = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });

      dispatch({
        type: UserRegisterContsant.USER_REGISTER_SUCCESS,
        payload: response.data.user,
      });

      dispatch({
        type: UserLoginConstant.USER_LOGIN_SUCCESS,
        payload: response.data.user,
      });
      localStorage.setItem(
        __FIND_ME_A_PLACE_USER,
        JSON.stringify(response.data.user)
      );
    } catch (error: any) {
      dispatch({
        type: UserRegisterContsant.USER_REGISTER_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const getProfile = () => async (dispatch: Dispatch<profileAction>) => {
  try {
    dispatch({
      type: UserProfileConstant.USER_PROFILE_REQUEST,
    });

    const response: any = await axios.get("/api/user/myprofile", {
      withCredentials: true,
    });

    dispatch({
      type: UserProfileConstant.USER_PROFILE_SUCCESS,
      payload: response.data.user,
    });
  } catch (error: any) {
    dispatch({
      type: UserProfileConstant.USER_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const updateProfile =
  (
    name?: string,
    email?: string,
    password?: string,
    file?: string | ArrayBuffer
  ) =>
  async (dispatch: Dispatch<profileUpdateAction>) => {
    try {
      dispatch({
        type: ProfileUpdateConstant.USER_PROFILE_UPADTE_REQUEST,
      });

      const response: any = await axios.put(
        "/api/user/updateprofile",
        {
          name: name ? name : undefined,
          email: email ? email : undefined,
          password: password ? password : undefined,
          profile_photo: file ? file : undefined,
        },
        { withCredentials: true }
      );

      dispatch({
        type: ProfileUpdateConstant.USER_PROFILE_UPADTE_SUCCESS,
        payload: response.data.user,
      });
    } catch (error: any) {
      dispatch({
        type: ProfileUpdateConstant.USER_PROFILE_UPADTE_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const forgotPassword =
  (email: string) => async (dispatch: Dispatch<forgotPasswordAction>) => {
    dispatch({
      type: UserForgetPassword.FORGOT_PASSWORD_REQUEST,
    });

    try {
      const response: any = await axios.post("/api/user/forgotpassword", {
        email,
      });

      dispatch({
        type: UserForgetPassword.FORGOT_PASSWORD_SUCCESS,
        payload: response.data.message,
      });
    } catch (error: any) {
      dispatch({
        type: UserForgetPassword.FORGOT_PASSWORD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const resetPassword =
  (password: string, resetToken: string) =>
  async (dispatch: Dispatch<resetPasswordAction>) => {
    dispatch({
      type: UserResetPassword.RESET_PASSWORD_REQUEST,
    });

    try {
      const response: any = await axios.put(
        `/api/user/resetpassword/${resetToken}`,
        {
          password,
        }
      );

      dispatch({
        type: UserResetPassword.RESET_PASSWORD_SUCCESS,
        payload: response.data.message,
      });
    } catch (error: any) {
      dispatch({
        type: UserResetPassword.RESET_PASSWORD_FAIL,
        payload: error.response.data.error,
      });
    }
  };

export const logout = () => {
  return async (
    dispatch: Dispatch<loginAction | profileAction | profileUpdateAction>
  ) => {
    try {
      await axios.get("/api/user/logout", {
        withCredentials: true,
      });

      dispatch({
        type: UserLoginConstant.USER_LOGOUT,
      });

      dispatch({
        type: UserProfileConstant.USER_PROFILE_RESET,
      });

      dispatch({
        type: ProfileUpdateConstant.USER_PROFILE_UPADTE_RESET,
      });

      localStorage.removeItem(__FIND_ME_A_PLACE_USER);
    } catch (error: any) {
      if (error.response.data.error) {
        dispatch({
          type: UserLoginConstant.USER_LOGOUT_FAIL,
          payload: error.response.data.error,
        });
        localStorage.removeItem(__FIND_ME_A_PLACE_USER);
      }
    }
  };
};
