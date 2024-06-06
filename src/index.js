import "./pages/index.css";
import { renderCard } from "./components/cards";
import { openPopup, closePopup, popups, clearPopup } from "./components/modal";
import {
  validationConfig,
  enableValidation,
  clearValidation,
} from "./components/validation";
import {
  getStartData,
  profileName,
  profileDescription,
  sentNewAvatar,
  sentNewCard,
  sentNewProfileInformation,
  deleteFunc,
} from "./components/api";

// Стартовая загрузка
getStartData();

// Добавление плавности открытия попапов
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Функциональность кнопки закрытия
const popupCloseButtons = document.querySelectorAll(".popup__close");

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});

// Попап редактирования информации профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const profileEditForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function updateProfileValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

profileEditButton.addEventListener("click", function () {
  updateProfileValue();
  clearValidation(profileEditForm, validationConfig);
  openPopup(popupTypeEdit);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  sentNewProfileInformation(
    nameInput.value,
    jobInput.value,
    profileEditForm,
    clearPopup
  );
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Попап добавления карточки
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const cardAddButton = document.querySelector(".profile__add-button");
const formNewPlace = document.forms["new-place"];
export const cardName = document.querySelector(".popup__input_type_card-name");
export const cardLink = document.querySelector(".popup__input_type_url");

cardAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
  formNewPlace.reset();
  clearValidation(formNewPlace, validationConfig);
});

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardNew = {};
  cardNew.name = cardName.value;
  cardNew.link = cardLink.value;
  cardNew.me = true;
  sentNewCard(cardNew, formNewPlace, renderCard, clearPopup);
}

formNewPlace.addEventListener("submit", handleFormSubmitCard);

// Попап редактирования аватара
const avatar = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["avatar"];

avatar.addEventListener("click", function () {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(popupEditAvatar);
});

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  const avatarLink = avatarForm.link.value;
  sentNewAvatar(avatarLink, avatarForm, clearPopup);
}

avatarForm.addEventListener("submit", handleFormSubmitAvatar);

// Настройка валидации
enableValidation(validationConfig);