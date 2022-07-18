import { baseURL } from "../utils/constants";

const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const getOrder = (ingredientsId) => {
  return fetch(`${baseURL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients: ingredientsId,
    }),
  }).then(checkResponse);
};
