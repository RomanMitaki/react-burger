import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/auth";

const initialState = {
  auth: false,
  userInfo: { email: "", name: "" },
  authRequest: false,
  authFailed: false,
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
    default: {
      return state;
    }
  }
};
