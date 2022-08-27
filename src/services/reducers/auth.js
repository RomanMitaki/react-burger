import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/auth";

const initialState = {
  auth: false,
  userInfo: { email: "", name: "" },
  authRequest: false,
  authFailed: false,
  logoutRequest: false,
  logoutFailed: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        authRequest: true,
        authFailed: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        auth: true,
        userInfo: action.userInfo,
        authRequest: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        authFailed: true,
        authRequest: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case LOGOUT_SUCCESS: {
      if (action.success) {
        return {
          ...state,
          auth: false,
          userInfo: { email: "", name: "" },
          logoutRequest: false,
        };
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
        auth: true,
      };
    }

    default: {
      return state;
    }
  }
};
