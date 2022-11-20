import {
    loginRequest,
    registerRequest,
    logoutRequest,
    updateUserInfo,
    refreshTokenRequest,
    getUserInfo,
    forgotPasswordRequest,
} from "../../utils/api";
import {setCookie, getCookie} from "../../utils/utils";
import {TLoginData, TRegisterData} from "../../utils/types";
import {AppDispatch} from "../../index";


export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const UPDATE_REQUEST: "UPDATE_REQUEST" = "UPDATE_REQUEST";
export const UPDATE_SUCCESS: "UPDATE_SUCCESS" = "UPDATE_SUCCESS";
export const UPDATE_FAILED: "UPDATE_FAILED" = "UPDATE_FAILED";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" = "FORGOT_PASSWORD_FAILED";

export type TLoginRequestAction = {
    readonly type: typeof LOGIN_REQUEST;
}

export type TLoginSuccessAction = {
    readonly type: typeof LOGIN_SUCCESS;
    readonly userInfo: { email: string, name: string };
}

export type TLoginFailedAction = {
    readonly type: typeof LOGIN_FAILED;
}

export type TLogoutRequestAction = {
    readonly type: typeof LOGOUT_REQUEST;
}

export type TLogoutSuccessAction = {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly success: boolean;
}

export type TLogoutFailedAction = {
    readonly type: typeof LOGOUT_FAILED;
}

export type TUpdateRequestAction = {
    readonly type: typeof UPDATE_REQUEST;
}

export type TUpdateSuccessAction = {
    readonly type: typeof UPDATE_SUCCESS;
    readonly userInfo: { email: string, name: string };
}

export type TUpdateFailedAction = {
    readonly type: typeof UPDATE_FAILED;
}

export type TGetUserRequestAction = {
    readonly type: typeof GET_USER_REQUEST;
}

export type TGetUserSuccessAction = {
    readonly type: typeof GET_USER_SUCCESS;
    readonly userInfo: { email: string, name: string };
}

export type TGetUserFailedAction = {
    readonly type: typeof GET_USER_FAILED;
}

export type TForgotPasswordRequestAction = {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
    readonly updatePasswordStatus: boolean;
}

export type TForgotPasswordFailedAction = {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export type TAuthActions =
    TLoginRequestAction
    | TLoginSuccessAction
    | TLoginFailedAction
    | TLogoutRequestAction
    | TLogoutSuccessAction
    | TLogoutFailedAction
    | TUpdateRequestAction
    | TUpdateSuccessAction
    | TUpdateFailedAction
    | TGetUserRequestAction
    | TGetUserSuccessAction
    | TGetUserFailedAction
    | TForgotPasswordRequestAction
    | TForgotPasswordFailedAction;


export function signIn(loginData: TLoginData) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });
        loginRequest(loginData)
            .then((res) => {
                if (res) {
                    const accessToken = res.accessToken.split("Bearer ")[1];
                    const refreshToken = res.refreshToken;
                    if (accessToken && refreshToken) {
                        setCookie("accessToken", accessToken, {"max-age": 1200});
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

export function regSignIn(regData: TRegisterData) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_REQUEST,
        });
        registerRequest(regData)
            .then((res) => {
                if (res) {
                    const accessToken = res.accessToken.split("Bearer ")[1];
                    const refreshToken = res.refreshToken;
                    if (accessToken && refreshToken) {
                        setCookie("accessToken", accessToken, {"max-age": 1200});
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

export function logout(tokenName: string) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        });
        const token = getCookie(tokenName);
        if (token) {
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
        }

    };
}

export function getUser() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_USER_REQUEST,
        });
        if (
            getCookie("accessToken") === undefined &&
            getCookie("refreshToken") === undefined
        ) {
            dispatch({
                type: GET_USER_FAILED,
            });
        }
        if (getCookie("accessToken") !== undefined) {
            getUserInfo()
                .then((res) => {
                    if (res) {
                        dispatch({
                            type: GET_USER_SUCCESS,
                            userInfo: res.user,
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
        } else {
            refreshTokenRequest().then((res) => {
                const accessToken = res.accessToken.split("Bearer ")[1];
                if (accessToken) {
                    setCookie("accessToken", accessToken, {"max-age": 1200});
                }
                getUserInfo()
                    .then((res) => {
                        if (res) {
                            dispatch({
                                type: GET_USER_SUCCESS,
                                userInfo: res.user,
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
            });
        }
    };
}

export function updateUserData(updateData: { email: string, name: string }) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_REQUEST,
        });
        if (getCookie("accessToken") !== undefined) {
            updateUserInfo(updateData)
                .then((res) => {
                    if (res) {
                        dispatch({
                            type: UPDATE_SUCCESS,
                            userInfo: res.user,
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
        } else {
            refreshTokenRequest().then((res) => {
                const accessToken = res.accessToken.split("Bearer ")[1];
                if (accessToken) {
                    setCookie("accessToken", accessToken, {"max-age": 1200});
                }
                updateUserInfo(updateData)
                    .then((res) => {
                        if (res) {
                            dispatch({
                                type: UPDATE_SUCCESS,
                                userInfo: res.user,
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
            });
        }
    };
}

export function updatePassword(email: {email: string} ) {
    return function (dispatch: AppDispatch) {
        forgotPasswordRequest(email)
            .then((res) => {
                dispatch({
                    type: FORGOT_PASSWORD_REQUEST,
                    updatePasswordStatus: res.success,
                });
            })
            .catch((err) => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                });
            });
    };
}
