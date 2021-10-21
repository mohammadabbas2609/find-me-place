import {
  UserLoginConstant,
  UserProfileConstant,
  UserRegisterContsant,
  ProfileUpdateConstant,
  UserForgetPassword,
  UserResetPassword,
} from "../constants/userConstants";

// Interfaces for LOGIN

interface UserLoginRequest {
  type: UserLoginConstant.USER_LOGIN_REQUEST;
}

export interface UserLoginSuccess {
  type: UserLoginConstant.USER_LOGIN_SUCCESS;
  payload: {
    name: string;
    email: string;
    _id: string;
  };
}

interface UserLoginFail {
  type: UserLoginConstant.USER_LOGIN_FAIL;
  payload: string;
}

interface UserLogout {
  type: UserLoginConstant.USER_LOGOUT;
}

interface UserLogoutFailed {
  type: UserLoginConstant.USER_LOGOUT_FAIL;
  payload: string;
}

export type loginAction =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFail
  | UserLogout
  | UserLogoutFailed;

// Interfaces for register

interface UserRegisterRequest {
  type: UserRegisterContsant.USER_REGISTER_REQUEST;
}

export interface UserRegisterSuccess {
  type: UserRegisterContsant.USER_REGISTER_SUCCESS;
  payload: {
    name: string;
    email: string;
    _id: string;
  };
}

interface UserRegisterFail {
  type: UserRegisterContsant.USER_REGISTER_FAIL;
  payload: string;
}

export type registerAction =
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFail;

// Interfaces for profile

interface UserProfileRequest {
  type: UserProfileConstant.USER_PROFILE_REQUEST;
}

export interface UserProfileSuccess {
  type: UserProfileConstant.USER_PROFILE_SUCCESS;
  payload: {
    name: string;
    email: string;
    _id: string;
  };
}

interface UserProfileFail {
  type: UserProfileConstant.USER_PROFILE_FAIL;
  payload: string;
}

interface UserProfileReset {
  type: UserProfileConstant.USER_PROFILE_RESET;
}

export type profileAction =
  | UserProfileRequest
  | UserProfileSuccess
  | UserProfileFail
  | UserProfileReset;

// Interfaces for profile update
interface UserProfileUpdateRequest {
  type: ProfileUpdateConstant.USER_PROFILE_UPADTE_REQUEST;
}

export interface UserProfileUpdateSuccess {
  type: ProfileUpdateConstant.USER_PROFILE_UPADTE_SUCCESS;
  payload: {
    name: string;
    email: string;
    _id: string;
    photo?: string;
  };
}

interface UserProfileUpdateFail {
  type: ProfileUpdateConstant.USER_PROFILE_UPADTE_FAIL;
  payload: string;
}

interface UserProfileUpdateReset {
  type: ProfileUpdateConstant.USER_PROFILE_UPADTE_RESET;
}

export type profileUpdateAction =
  | UserProfileUpdateRequest
  | UserProfileUpdateSuccess
  | UserProfileUpdateFail
  | UserProfileUpdateReset;

// Forget Password Interfaces

interface ForgotPasswordRequest {
  type: UserForgetPassword.FORGOT_PASSWORD_REQUEST;
}

interface ForgotPasswordSuccess {
  type: UserForgetPassword.FORGOT_PASSWORD_SUCCESS;
  payload: string;
}

interface ForgotPasswordFail {
  type: UserForgetPassword.FORGOT_PASSWORD_FAIL;
  payload: string;
}

export type forgotPasswordAction =
  | ForgotPasswordRequest
  | ForgotPasswordSuccess
  | ForgotPasswordFail;

// ResetPassword Interfaces

interface ResetPasswordRequest {
  type: UserResetPassword.RESET_PASSWORD_REQUEST;
}

interface ResetPasswordSuccess {
  type: UserResetPassword.RESET_PASSWORD_SUCCESS;
  payload: string;
}

interface ResetPasswordFail {
  type: UserResetPassword.RESET_PASSWORD_FAIL;
  payload: string;
}

export type resetPasswordAction =
  | ResetPasswordRequest
  | ResetPasswordSuccess
  | ResetPasswordFail;
