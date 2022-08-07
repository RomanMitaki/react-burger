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
