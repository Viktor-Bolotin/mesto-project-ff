import "./pages/index.css";
import {
  renderCard,
  cardToDelete,
  cardToDeleteId,
  popupTypeDelete,
} from "./components/card";
import {
  openPopup,
  closePopup,
  popups,
  clearAndClosePopup,
} from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getStartData,
  sentNewAvatar,
  sentNewCard,
  deleteCardFunc,
  sentNewProfileInformation,
} from "./components/api";

// Стартовая загрузка
let userId;
getStartData()
  .then(([userData, cards]) => {
    userId = userData._id;
    updateProfileInformation(userData);
    profileAvatar.style = `background-image: url(${userData.avatar})`;
    cards.forEach((card) => {
      setOwnerCard(card);
      renderCard(card, "append", userId);
    });
  })
  .catch((error) => {
    console.log(error);
  });

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

const formEditProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

function updateProfileValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

profileEditButton.addEventListener("click", function () {
  updateProfileValue();
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupTypeEdit);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  setSavingStatus(true, formEditProfile, messagesSave);

  sentNewProfileInformation(nameInput.value, jobInput.value)
    .then((data) => {
      setSavingStatus(false, formEditProfile, messagesSave);
      updateProfileInformation(data);
      clearAndClosePopup(formEditProfile, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    });
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

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
  setSavingStatus(true, formNewPlace, messagesSave);

  evt.preventDefault();

  const cardNew = {
    name: cardName.value,
    link: cardLink.value,
  };

  sentNewCard(cardNew)
    .then((post) => {
      setOwnerCard(post);
      renderCard(post, "prepend", userId);
      setSavingStatus(false, formNewPlace, messagesSave);
      clearAndClosePopup(formNewPlace, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    });
}

formNewPlace.addEventListener("submit", handleFormSubmitCard);

// Попап редактирования аватара
const profileAvatar = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
const formEditAvatar = document.forms["avatar"];

profileAvatar.addEventListener("click", function () {
  formEditAvatar.reset();
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
});

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  setSavingStatus(true, formEditAvatar, messagesSave);
  const avatarLink = formEditAvatar.link.value;
  sentNewAvatar(avatarLink)
    .then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar})`;
      setSavingStatus(false, formEditAvatar, messagesSave);
      clearAndClosePopup(formEditAvatar, validationConfig);
    })

    .catch((err) => {
      console.log(err);
    });
}

formEditAvatar.addEventListener("submit", handleFormSubmitAvatar);

// Попап удаления карточки
const deleteCardButton = popupTypeDelete.querySelector(".popup__button");

deleteCardButton.addEventListener("click", function () {
  setSavingStatus(true, popupTypeDelete, messagesDelete);
  deleteCardFunc(cardToDeleteId).then((data) => {
    setSavingStatus(false, popupTypeDelete, messagesDelete);
    cardToDelete.remove();
    closePopup();
  });
});

// Настройка валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button__inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(validationConfig);

// Проверка владельца карточки
function setOwnerCard(card) {
  if (card.owner._id !== userId) {
    card.owner.me = false;
  } else {
    card.owner.me = true;
  }
}

// Настройка сообщений о сохранении или удалении
const messagesSave = {
  true: "Сохранение...",
  false: "Сохранить",
};

const messagesDelete = {
  true: "Удаление...",
  false: "Да",
};

function setSavingStatus(isSaving, popup, messagesObject) {
  const saveButton = popup.querySelector(".popup__button");

  if (isSaving) {
    saveButton.textContent = messagesObject.true;
  } else {
    saveButton.textContent = messagesObject.false;
  }
}

// Обновление информации на странице
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function updateProfileInformation(data) {
  profileName.textContent = data.name;
  profileDescription.textContent = data.about;
}
