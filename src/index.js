import './pages/index.css' 
import { initialCards } from './components/initialCards';
import { cardTemplate, cardElement, likeCard, deleteFunc, createCard, handleFormSubmitCard, popupPlace } from './components/cards';
import { openPopup, closePopup, closePopupForOverlay, closePopupForEscape, handleFormSubmit} from './components/modal'

export const page = document.querySelector('.page')
export const popups = Array.from(document.querySelectorAll('.popup'))

export const popupImage = document.querySelector('.popup__image')
export const popupCaption = document.querySelector('.popup__caption')


// Создание и добавление карточек
export const cardShow = document.querySelector('.places__list');
const popupCloseButtons = document.querySelectorAll('.popup__close')

initialCards.forEach((card) =>{
  createCard(card, deleteFunc, likeCard, popupPlace);
  cardShow.append(cardElement)
})

// Добавление плавности открытия попапов
popups.forEach (popup => {
  popup.classList.add('popup_is-animated')
})

// Функция открытия и закрытия попапов
const profileEditButton = document.querySelector('.profile__edit-button')
const popupTypeEdit = document.querySelector('.popup_type_edit')

const profileAddButton = document.querySelector('.profile__add-button')
const popupTypeNewCard = document.querySelector('.popup_type_new-card')


profileEditButton.addEventListener('click', function() {
  openPopup(popupTypeEdit)
});

profileAddButton.addEventListener('click', function() {
  openPopup(popupTypeNewCard);
});

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closePopup)
});


// Функция редактирования информации профиля
export let profileName = document.querySelector('.profile__title');
export let profileDescription = document.querySelector('.profile__description');

const formElement = popupTypeEdit.querySelector('.popup__form');
export const nameInput = document.querySelector('.popup__input_type_name');
export const jobInput = document.querySelector('.popup__input_type_description');

nameInput.setAttribute('value', profileName.textContent);
jobInput.setAttribute('value', profileDescription.textContent);

formElement.addEventListener('submit', handleFormSubmit)


// Функция добавления карточки
export const formCard = popupTypeNewCard.querySelector('.popup__form');
export const cardName = document.querySelector('.popup__input_type_card-name')
export const cardLink = document.querySelector('.popup__input_type_url')

formCard.addEventListener('submit', handleFormSubmitCard)