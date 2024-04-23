import "./pages/index.css";
import { initialCards } from "./components/initialCards";
import {
  cardTemplate,
  cardElement,
  likeCard,
  deleteFunc,
  createCard,
  cardSection,
  formCard,
  cardName,
  cardLink,
  cardImage,
  cardTitle,
  popupTypeNewCard,
} from "./components/cards";
import {
  openPopup,
  closePopup,
  closePopupForOverlay,
  closePopupForEscape,
  page,
  popups,
} from "./components/modal";

const popupTypeImage = document.querySelector(".popup_type_image");

// Создание и добавление карточек
const popupCloseButtons = document.querySelectorAll(".popup__close");

initialCards.forEach((card) => {
  createCard(card, deleteFunc, likeCard, CreatePopupPlace);
  cardSection.append(cardElement);
});

// Добавление плавности открытия попапов
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Функция открытия и закрытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const profileAddButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});

// Функция редактирования информации профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileEditForm = popupTypeEdit.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
nameInput.setAttribute("value", profileName.textContent);
jobInput.setAttribute("value", profileDescription.textContent);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileDescription.textContent);
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue;
  closePopup();
}

// Редактирование профиля
profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Функция добавления карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardNew = {};
  cardNew.name = cardName.value;
  cardNew.link = cardLink.value;
  createCard(cardNew, deleteFunc, likeCard, CreatePopupPlace);
  cardSection.prepend(cardElement);
  formCard.reset();
  closePopup();
}

// Добавление новых карточек
formCard.addEventListener("submit", handleFormSubmitCard);

// Открытие попапа картинки
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function CreatePopupPlace(evt) {
  const targetImage = evt.target;
  const targetPicture = targetImage.src;
  const targetName = targetImage.alt;
  popupImage.src = targetPicture;
  popupImage.alt = targetName;
  popupCaption.textContent = targetImage.alt;
  openPopup(popupTypeImage);
}

