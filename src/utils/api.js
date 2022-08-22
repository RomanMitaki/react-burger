import { baseURL, API } from "./constants";

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getEngredientsList = async () => {
  const res = await fetch(API);
  return checkResponse(res);
};

export const getOrder = async (ingredientsId) => {
  const res = await fetch(`${baseURL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  });
  return checkResponse(res);
};

export const registerRequest = async (regData) => {
  const res = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: regData.email,
      password: regData.password,
      name: regData.name,
    }),
  });
  return checkResponse(res);
};

export const forgotPasswordRequest = async (email) => {
  const res = await fetch(`${baseURL}/password-reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.email,
    }),
  });
  return checkResponse(res);
};

export const resetPasswordRequest = async (data) => {
  const res = await fetch(`${baseURL}/password-reset/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      password: data.password,
      token: data.verCode,
    }),
  });
  return checkResponse(res);
};
