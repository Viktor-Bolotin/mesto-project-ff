import { page, popups, profileName, profileDescription, nameInput, jobInput  } from '../index';

// Функции открытия и закрытия попапов
export function openPopup(popup) {
  popup.classList.add('popup_is-opened')
  page.addEventListener('mousedown',  closePopupForOverlay);
  page.addEventListener ('keydown', closePopupForEscape)
}

export function closePopup() {
  popups.forEach(popup => {
  popup.classList.remove('popup_is-opened')
  })
  page.removeEventListener('click', closePopupForOverlay) 
  page.removeEventListener ('keydown', closePopupForEscape)
}

export function closePopupForOverlay (evt) {
  if (popups.includes(evt.target)) {
    closePopup()
  }
}

export function closePopupForEscape(evt) {
  if(evt.key === 'Escape') {
    closePopup()
  }
}

// Редактирование профиля
export function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = jobInputValue
  
  closePopup()
}