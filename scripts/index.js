// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardShow = document.querySelector('.places__list');
let cardElement 

function deleteFunc(element) {
  element.closest('.places__item').remove()
}

function createCard(item, deleteFunc) {

  cardElement = cardTemplate.querySelector('.card').cloneNode(true); 

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function(){
    deleteFunc(deleteButton)
  });
  return cardElement;
}

initialCards.forEach((card) =>{
  createCard(card, deleteFunc);
  cardShow.append(cardElement)
})