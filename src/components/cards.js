import { cardName, cardLink, cardShow, formCard, popupImage, page, popupCaption } from "../index";
import { closePopup, openPopup, closePopupForEscape, closePopupForOverlay } from "./modal";

export const cardTemplate = document.querySelector('#card-template').content;
export let cardElement

// Функции внутри карточек
export function deleteFunc(element) {
  element.closest('.places__item').remove()
}

export function likeCard(button) {
  button.classList.toggle('card__like-button_is-active')
}

export function popupPlace(evt) {
  if (evt.target.tagName === 'IMG') {
  const targetImage = evt.target
  const targetPicture = targetImage.src
  const targetName = targetImage.alt
  popupImage.src = targetPicture
  popupImage.alt = targetName
  popupCaption.textContent = targetImage.alt
  const popupTypeImage = document.querySelector('.popup_type_image')
  openPopup(popupTypeImage)
  }
}

// Создание подготовленных карточек
export function createCard(item, deleteFunc, likeCard, popupPlace) {

  cardElement = cardTemplate.querySelector('.card').cloneNode(true); 

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    deleteFunc(deleteButton)
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function() {
    likeCard(likeButton);
  });

  cardElement.addEventListener('click', function(evt) {
    popupPlace(evt);
  })

  return cardElement;
}

// Добавление новых карточек
export function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardNew = {}
  cardNew.name = cardName.value;
  cardNew.link = cardLink.value;
  createCard(cardNew, deleteFunc, likeCard, popupPlace)
  cardShow.prepend(cardElement)
  formCard.reset()
  closePopup()
}





