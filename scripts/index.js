// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
let cardNumder = 0
const readyCards = []
const cardShow = document.querySelector('.places__list');

const createCard = function() {

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCards[cardNumder].link;
  cardElement.querySelector('.card__image').alt = initialCards[cardNumder].name;
  cardElement.querySelector('.card__title').textContent = initialCards[cardNumder].name;
  cardNumder++;
  readyCards.push(cardElement);

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {
    const deleteCard = deleteButton.closest('.places__item')
    deleteCard.remove()
  })

  return cardElement;
}

initialCards.forEach(createCard)

cardShow.append(...readyCards)