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

type user = {
  name: string;
  email: string;
  _id: string;
  photo?: string;
};

interface UserState {
  user: user | null;
  loading: boolean;
  error: string | null;
}

export const loginReducer = (
  state: UserState = { user: null, loading: false, error: null },
  action: loginAction
): UserState => {
  switch (action.type) {
    case UserLoginConstant.USER_LOGIN_REQUEST:
      return { loading: true, user: null, error: null };
    case UserLoginConstant.USER_LOGIN_SUCCESS:
      return { loading: false, user: action.payload, error: null };
    case UserLoginConstant.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload, user: null };
    case UserLoginConstant.USER_LOGOUT:
      return { loading: false, error: null, user: null };
    case UserLoginConstant.USER_LOGOUT_FAIL:
      return { loading: false, error: action.payload, user: null };
    default:
      return state;
  }
};

export const registerReducer = (
  state: UserState = { user: null, loading: false, error: null },
  action: registerAction
): UserState => {
  switch (action.type) {
    case UserRegisterContsant.USER_REGISTER_REQUEST:
      return { loading: true, user: null, error: null };
    case UserRegisterContsant.USER_REGISTER_SUCCESS:
      return { loading: false, user: action.payload, error: null };
    case UserRegisterContsant.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload, user: null };
    default:
      return state;
  }
};

export const getProfileReducer = (
  state: UserState = { user: null, loading: false, error: null },
  action: profileAction
): UserState => {
  switch (action.type) {
    case UserProfileConstant.USER_PROFILE_REQUEST:
      return { loading: true, user: null, error: null };
    case UserProfileConstant.USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload, error: null };
    case UserProfileConstant.USER_PROFILE_FAIL:
      return { loading: false, error: action.payload, user: null };
    case UserProfileConstant.USER_PROFILE_RESET:
      return { loading: false, error: null, user: null };
    default:
      return state;
  }
};

export const updateProfileReducer = (
  state: UserState = { user: null, loading: false, error: null },
  action: profileUpdateAction
) => {
  switch (action.type) {
    case ProfileUpdateConstant.USER_PROFILE_UPADTE_REQUEST:
      return { loading: true, user: null, error: null };
    case ProfileUpdateConstant.USER_PROFILE_UPADTE_SUCCESS:
      return { loading: false, user: action.payload, error: null };
    case ProfileUpdateConstant.USER_PROFILE_UPADTE_FAIL:
      return { loading: false, user: null, error: action.payload };
    case ProfileUpdateConstant.USER_PROFILE_UPADTE_RESET:
      return { loading: false, error: null, user: null };
    default:
      return state;
  }
};

// @User forgot password Reducers

interface forgotPasswordState {
  loading: boolean;
  error: null | string;
  message: null | string;
}

export const forgotPasswordReducer = (
  state: forgotPasswordState = { loading: false, error: null, message: null },
  action: forgotPasswordAction
): forgotPasswordState => {
  switch (action.type) {
    case UserForgetPassword.FORGOT_PASSWORD_REQUEST:
      return { loading: true, message: null, error: null };
    case UserForgetPassword.FORGOT_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload, error: null };
    case UserForgetPassword.FORGOT_PASSWORD_FAIL:
      return { loading: false, message: null, error: action.payload };
    default:
      return state;
  }
};

export const resetPasswordReducer = (
  state: forgotPasswordState = { loading: false, error: null, message: null },
  action: resetPasswordAction
): forgotPasswordState => {
  switch (action.type) {
    case UserResetPassword.RESET_PASSWORD_REQUEST:
      return { loading: true, message: null, error: null };
    case UserResetPassword.RESET_PASSWORD_SUCCESS:
      return { loading: false, message: action.payload, error: null };
    case UserResetPassword.RESET_PASSWORD_FAIL:
      return { loading: false, message: null, error: action.payload };
    default:
      return state;
  }
};
