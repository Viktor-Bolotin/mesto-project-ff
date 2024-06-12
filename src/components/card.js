import { sentLikeCard, sentDeleteLikeCard } from "./api";
import { openPopup } from "./modal";

// Выбор функции обработки лайка для отправки на сервер
function toggleLikeStatus(button, cardId, card) {
  if (!button.classList.contains("card__like-button_is-active")) {
    sentLikeCard(cardId)
      .then((data) => {
        button.classList.add("card__like-button_is-active");
        updateLikeQuantity(data.likes.length, card);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    sentDeleteLikeCard(cardId)
      .then((data) => {
        button.classList.remove("card__like-button_is-active");
        updateLikeQuantity(data.likes.length, card);
      })

      .catch((err) => {
        console.log(err);
      });
  }
}

function updateLikeQuantity(figure, card) {
  card.querySelector(".card__like-quantity").textContent = figure;
}

// Обработчик нажатия на кнопку лайка
export function likeCard(button) {
  const card = button.closest(".card");
  const cardId = card.getAttribute("data-card-id");
  toggleLikeStatus(button, cardId, card);
}

// Открытие попапа с картинкой
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

export function handleImageClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupTypeImage);
}

// Создание карточек
export const cardTemplate = document.querySelector("#card-template").content;
export const cardSection = document.querySelector(".places__list");

export function createCard(item, likeCard, handleImageClick, idCurrentUser) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeQuantity = cardElement.querySelector(".card__like-quantity");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  cardLikeQuantity.textContent = item.likes.length;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.setAttribute("data-card-id", item._id);

  if (item.owner.me) {
    deleteButton.addEventListener("click", function (evt) {
      const deleteCard = evt.target.closest(".card");
      const cardId = deleteCard.getAttribute("data-card-id");
      openPopupTypeDelete(deleteCard, cardId);
    });
  } else {
    deleteButton.remove();
  }

  const cardLikes = item.likes;
  const hasMyLike = cardLikes.some((like) => {
    like._id == idCurrentUser;
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  likeButton.classList.toggle("card__like-button_is-active", hasMyLike);

  cardImage.addEventListener("click", () => handleImageClick(item));

  return cardElement;
}

// Добавление карточек на страницу
export function renderCard(item, method = "append", idCurrentUser) {
  const cardElement = createCard(
    item,
    likeCard,
    handleImageClick,
    idCurrentUser
  );
  cardSection[method](cardElement);
}

// Попап удаления
export const popupTypeDelete = document.querySelector(
  ".popup_type_delete-card"
);

export let cardToDelete;
export let cardToDeleteId;

function openPopupTypeDelete(card, id) {
  openPopup(popupTypeDelete);
  cardToDelete = card;
  cardToDeleteId = id;
}
