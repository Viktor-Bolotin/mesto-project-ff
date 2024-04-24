import "./pages/index.css";
import { initialCards } from "./components/initialCards";
import {
  likeCard,
  deleteFunc,
  createCard,
  cardSection,
  cardName,
  cardLink,
  popupTypeNewCard,
} from "./components/cards";
import { openPopup, closePopup, popups } from "./components/modal";

// Функция добавления карт на страницу
function renderCard(item, method = "append") {
  cardSection[method](item);
}

// Генадий, большое спасибо, что помогли разобраться с cardElement! Я теперь понял, как это должно работать :)
initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteFunc, likeCard, handleImageClick);
  renderCard(cardElement, "append");
});

// Добавление плавности открытия попапов
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Открытие и закрытие попапов
const popupCloseButtons = document.querySelectorAll(".popup__close");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");

profileEditButton.addEventListener("click", function () {
  openPopup(popupTypeEdit);
  updateProfileInformation();
});

profileAddButton.addEventListener("click", function () {
  openPopup(popupTypeNewCard);
});

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", closePopup);
});

// Редактирование информации профиля
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditForm = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

nameInput.setAttribute("value", profileName.textContent);
jobInput.setAttribute("value", profileDescription.textContent);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

function updateProfileInformation () {
  nameInput.textContent = profileName.textContent;
  jobInput.textContent = profileDescription.textContent;
}

profileEditForm.addEventListener("submit", handleProfileFormSubmit);

// Добавление новых карточек
const formNewPlace = document.forms["new-place"];

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardNew = {};
  cardNew.name = cardName.value;
  cardNew.link = cardLink.value;
  const cardElement = createCard(
    cardNew,
    deleteFunc,
    likeCard,
    handleImageClick
  );
  renderCard(cardElement, "prepend");
  formNewPlace.reset();
  closePopup();
}

formNewPlace.addEventListener("submit", handleFormSubmitCard);

// Открытие попапа картинки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");

function handleImageClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupTypeImage);
}
