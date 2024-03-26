// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

for(let i=0; i<initialCards.length; i++) {
const cardTemplate = document.querySelector('#card-template').content;
const cardShow = document.querySelector('.places__list');

const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

cardElement.querySelector('.card__image').src = initialCards[i].link;
cardElement.querySelector('.card__image').alt = initialCards[i].name;
cardElement.querySelector('.card__title').textContent = initialCards[i].name;

cardShow.append(cardElement);
}

let DeleteButtonMassive = document.querySelectorAll('.card__delete-button')

let DeleteListener = function(DeleteButton) {
  DeleteButton.addEventListener('click', function() {
    let DeleteCard = DeleteButton.closest('.places__item')
    DeleteCard.remove()
  })
}

DeleteButtonMassive.forEach(function(item) {
  DeleteListener(item);
})
