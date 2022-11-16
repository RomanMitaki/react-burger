import {baseURL, API} from "./constants";
import {getCookie} from "./utils";
import {TIngredientListResponse} from "./types";

const checkResponse = <T>(res: Response): Promise<T> => {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
};

export const getEngredientsList = async () => {
    const res = await fetch(API);
    return checkResponse<TIngredientListResponse>(res);
};

export const getOrder = async (ingredientsId: string[]) => {
    const res = await fetch(`${baseURL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify({
            ingredients: ingredientsId,
        }),
    });
    return checkResponse(res);
};

export const registerRequest = async (regData: { email: string, password: string, name: string }) => {
    const res = await fetch(`${baseURL}/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: regData.email,
            password: regData.password,
            name: regData.name,
        }),
    });
    return checkResponse(res);
};

export const loginRequest = async (loginData: { email: string, password: string }) => {
    const res = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
        }),
    });
    return checkResponse(res);
};

export const forgotPasswordRequest = async (email: { email: string }) => {
    const res = await fetch(`${baseURL}/password-reset`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email.email,
        }),
    });
    return checkResponse(res);
};

export const resetPasswordRequest = async (data: { password: string, verCode: string }) => {
    const res = await fetch(`${baseURL}/password-reset/reset`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            password: data.password,
            token: data.verCode,
        }),
    });
    return checkResponse(res);
};

export const logoutRequest = async (refreshToken: string) => {
    const res = await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            token: refreshToken,
        }),
    });
    return checkResponse(res);
};

export const getUserInfo = async () => {
    const res = await fetch(`${baseURL}/auth/user`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("accessToken"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    });
    return checkResponse(res);
};

export const refreshTokenRequest = async () => {
    const refreshToken = getCookie("refreshToken");
    const res = await fetch(`${baseURL}/auth/token`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            token: refreshToken,
        }),
    });
    return checkResponse(res);
};

export const updateUserInfo = async (updateData: { email: string, name: string }) => {
    const res = await fetch(`${baseURL}/auth/user`, {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getCookie("accessToken"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            email: updateData.email,
            name: updateData.name,
        }),
    });
    return checkResponse(res);
};
