export const cardTemplate = document.querySelector("#card-template").content;
export const cardSection = document.querySelector(".places__list");
export const popupTypeNewCard = document.querySelector(".popup_type_new-card");
export const cardName = document.querySelector(".popup__input_type_card-name");
export const cardLink = document.querySelector(".popup__input_type_url");

// Функции внутри карточек
export function deleteFunc(element) {
  element.closest(".places__item").remove();
}

export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

// Создание подготовленных карточек
export function createCard(item, deleteFunc, likeCard, handleImageClick) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", function () {
    deleteFunc(deleteButton);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", function () {
    likeCard(likeButton);
  });

  cardImage.addEventListener("click", () => handleImageClick(item));

  return cardElement;
}
