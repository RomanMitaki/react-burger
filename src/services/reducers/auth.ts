import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILED,
} from "../actions/auth";

const initialState = {
  auth: false,
  userInfo: { email: "", name: "" },
  authRequest: false,
  authFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  updateRequest: false,
  updateFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  updatePasswordStatus: false,
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
    case UPDATE_REQUEST: {
      return {
        ...state,
        updateRequest: true,
        updateFailed: false,
      };
    }
    case UPDATE_SUCCESS: {
      return {
        ...state,
        userInfo: action.userInfo,
        updateRequest: false,
      };
    }
    case UPDATE_FAILED: {
      return {
        ...state,
        updateFailed: true,
        updateRequest: false,
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userInfo: action.userInfo,
        getUserRequest: false,
        auth: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
      };
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        updatePasswordStatus: action.updatePasswordStatus,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        updatePasswordStatus: false,
      };
    }

    default: {
      return state;
    }
  }
};
