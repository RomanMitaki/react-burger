import { loginRequest, registerRequest, logoutRequest } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/utils";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export function signIn(loginData) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(loginData)
      .then((res) => {
        if (res) {
          let accessToken = res.accessToken.split("Bearer ")[1];
          let refreshToken = res.refreshToken;
          if (accessToken && refreshToken) {
            setCookie("accessToken", accessToken, { "max-age": 1200 });
            setCookie("refreshToken", refreshToken);
          }

          dispatch({
            type: LOGIN_SUCCESS,
            userInfo: res.user,
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function regSignIn(regData) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    registerRequest(regData)
      .then((res) => {
        if (res) {
          let accessToken = res.accessToken.split("Bearer ")[1];
          let refreshToken = res.refreshToken;
          if (accessToken && refreshToken) {
            setCookie("accessToken", accessToken);
            setCookie("refreshToken", refreshToken);
          }

          dispatch({
            type: LOGIN_SUCCESS,
            userInfo: res.user,
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    const token = getCookie("refreshToken");
    logoutRequest(token)
      .then((res) => {
        if (res) {
          dispatch({
            type: LOGOUT_SUCCESS,
            success: res.success,
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}
