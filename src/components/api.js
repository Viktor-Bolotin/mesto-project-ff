export const apiConfig = {
  url: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "0eca1750-b436-4916-b371-28c42c11999a",
    "Content-Type": "application/json",
  },
};

export function getUser() {
  return fetch(`${apiConfig.url}/users/me`, {
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
    method: "GET",
  }).then((res) => {
    return handleResponse(res);
  });
}

export function getCards() {
  return fetch(`${apiConfig.url}/cards`, {
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    method: "GET",
  }).then((res) => {
    return handleResponse(res);
  });
}

export function sentNewProfileInformation(nameNew, aboutNew) {
  return fetch(`${apiConfig.url}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      name: nameNew,
      about: aboutNew,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
}

export function sentNewCard(card) {
  return fetch(`${apiConfig.url}/cards`, {
    method: "POST",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
}

export function sentNewAvatar(link) {
  return fetch(`${apiConfig.url}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => {
    return handleResponse(res);
  });
}

export function deleteCardFunc(id) {
  return fetch(`${apiConfig.url}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  }).then((res) => {
    return handleResponse(res);
  });
}

export function sentLikeCard(id) {
  return fetch(`${apiConfig.url}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  }).then((res) => {
    return handleResponse(res);
  });
}

export function sentDeleteLikeCard(id) {
  return fetch(`${apiConfig.url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  }).then((res) => {
    return handleResponse(res);
  });
}

export function getStartData() {
  return Promise.all([getUser(), getCards()]);
}

export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}
