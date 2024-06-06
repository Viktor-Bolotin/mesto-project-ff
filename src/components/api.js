import { clearPopup, closePopup } from "./modal";
import { clearValidation, validationConfig } from "./validation";
import { renderCard, popupTypeDelete } from "./cards";

export const apiConfig = {
  url: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "0eca1750-b436-4916-b371-28c42c11999a",
    "Content-Type": "application/json",
  },
  myId: "6d74a5bea09caca2faf33cbc",
};

export function getUser() {
  fetch(`${apiConfig.url}/users/me`, {
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then((profileInformation) => {
      updateProfileInformation(profileInformation);
      profileAvatar.style = `background-image: url(${profileInformation.avatar})`;
    })

    .catch((err) => {
      console.log(err);
    });
}

export function getCards() {
  fetch(`${apiConfig.url}/cards`, {
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    method: "GET",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then((posts) => {
      posts.forEach((post) => {
        setOwnerCard(post);
        renderCard(post, "append");
      });
    })

    .catch((err) => {
      console.log(err);
    });
}

export function sentNewProfileInformation(nameNew, aboutNew, form, clearPopup) {
  setSavingStatus(true, form, messagesSave);
  fetch(`${apiConfig.url}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      name: nameNew,
      about: aboutNew,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then((data) => {
      setSavingStatus(false, form, messagesSave);
      updateProfileInformation(data);
      clearPopup(form);
    })

    .catch((err) => {
      console.log(err);
    });
}

export function sentNewCard(card, form, renderCard, clearPopup) {
  setSavingStatus(true, form, messagesSave);
  fetch(`${apiConfig.url}/cards`, {
    method: "POST",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((post) => {
      setOwnerCard(post);
      renderCard(post, "prepend");
      setSavingStatus(false, form, messagesSave);
      clearPopup(form);
    })

    .catch((err) => {
      console.log(err);
    });
}

export function sentNewAvatar(link, form, clearPopup) {
  setSavingStatus(true, form, messagesSave);
  fetch(`${apiConfig.url}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
      "Content-Type": `${apiConfig.headers["Content-Type"]}`,
    },
    body: JSON.stringify({
      avatar: link,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then((post) => {
      profileAvatar.style = `background-image: url(${post.avatar})`;
      setSavingStatus(false, form, messagesSave);
      clearPopup(form);
    })

    .catch((err) => {
      console.log(err);
    });
}

export function deleteFunc(element, id) {
  setSavingStatus(true, popupTypeDelete, messagesDelete)
  fetch(`${apiConfig.url}/cards/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        element.remove();
        closePopup();
        setSavingStatus(false, popupTypeDelete, messagesDelete);
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    });
}

export function sentlikeCard(id, card) {
  fetch(`${apiConfig.url}/cards/likes/${id}`, {
    method: "PUT",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then((post) => {
      updateLikeQuantity(post.likes.length, card);
    })

    .catch((err) => {
      console.log(err);
    });
}

export function sentDeleteLikeCard(id, card) {
  fetch(`${apiConfig.url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `${apiConfig.headers.authorization}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((post) => {
      updateLikeQuantity(post.likes.length, card);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileAvatar = document.querySelector(".profile__image");

export function updateProfileInformation(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
}

export function setOwnerCard(card) {
  if (card.owner._id !== `${apiConfig.myId}`) {
    card.owner.me = false;
  } else {
    card.owner.me = true;
  }
}

export function setSavingStatus(isSaving, popup, messagesObject) {
  const saveButton = popup.querySelector(".popup__button");

  if (isSaving) {
    saveButton.textContent = messagesObject.true;
  } else {
    saveButton.textContent = messagesObject.false;
  }
}

export function getStartData() {
  getUser();
  getCards();
}

function updateLikeQuantity(figure, card) {
  card.querySelector(".card__like-quantity").textContent = figure;
}

const messagesSave = {
  true: "Сохранение...",
  false: "Сохранить"
}

const messagesDelete = {
  true: "Удаление...",
  false: "Да"
}