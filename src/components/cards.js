import { deleteFunc, sentlikeCard, sentDeleteLikeCard, apiConfig } from "./api";
import { openPopup } from "./modal";

// Выбор функции обработки лайка для отправки на сервер
function toggleLikeStatus(button, cardId, card) {
  if (button.classList.contains("card__like-button_is-active")) {
    sentlikeCard(cardId, card);
  } else {
    sentDeleteLikeCard(cardId, card);
  }
}

// Обработчик нажатия на кнопку лайка
export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
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

export function createCard(item, deleteFunc, likeCard, handleImageClick) {
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
      openPopupTypeDelete(deleteCard, cardId)
    });
  } else {
    deleteButton.remove();
  }

  const cardLikes = item.likes;
  const hasMyLike = cardLikes.some((like) => {
    if (like._id == `${apiConfig.myId}`) {
      return true;
    } else {
      return false;
    }
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  if (hasMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => handleImageClick(item));

  return cardElement;
}

// Добавление карточек на страницу
export function renderCard(item, method = "append") {
  const cardElement = createCard(item, deleteFunc, likeCard, handleImageClick);
  cardSection[method](cardElement);
}

// Попап удаления
export const popupTypeDelete = document.querySelector('.popup_type_delete-card')
const deleteCardButton = popupTypeDelete.querySelector('.popup__button')


function openPopupTypeDelete(card, id) {
  openPopup(popupTypeDelete);
  deleteCardButton.addEventListener('click', function() {
    deleteFunc(card, id)
  })
}