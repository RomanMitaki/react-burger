import {
  loginRequest,
  registerRequest,
  logoutRequest,
  updateUserInfo,
  refreshTokenRequest,
  getUserInfo
} from "../../utils/api";
import { setCookie, getCookie } from "../../utils/utils";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED =  "GET_USER_FAILED";

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

export function getUser() {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUserInfo()
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: GET_USER_SUCCESS,
            userInfo: res.user,
          });
        }
        if (res.success === false) {
          refreshTokenRequest().then((res) => {
            let accessToken = res.accessToken.split("Bearer ")[1];
            if (accessToken) {
              setCookie("accessToken", accessToken);
            }
            getUserInfo().then((res) =>
              dispatch({
                type: GET_USER_SUCCESS,
                userInfo: res.user,
              })
            );
          });
        }
        if (!res) {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
}

export function updateUserData(updateData) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_REQUEST,
    });
    updateUserInfo(updateData)
      .then((res) => {
        if (res.success === true) {
          dispatch({
            type: UPDATE_SUCCESS,
            userInfo: res.user,
          });
        }
        if (res.success === false) {
          refreshTokenRequest().then((res) => {
            let accessToken = res.accessToken.split("Bearer ")[1];
            if (accessToken) {
              setCookie("accessToken", accessToken);
            }
            updateUserInfo(updateData).then((res) =>
              dispatch({
                type: UPDATE_SUCCESS,
                userInfo: res.user,
              })
            );
          });
        }
        if (!res) {
          dispatch({
            type: UPDATE_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_FAILED,
        });
      });
  };
}
