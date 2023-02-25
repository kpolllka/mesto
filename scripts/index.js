//РАБОТА С КАРТОЧКАМИ
function deleteCard (evt) { //удаление карточки по клику на корзину
  evt.target.closest('.element').remove();
}

function likeCard (evt) { //лайк и не лайк карточки
  evt.target.classList.toggle('element__like_active');
}

function createCard(item) { //создание карточки
  const card = elementTemplate.cloneNode(true);
  const imgElement = card.querySelector('.element__mask-group');

    card.querySelector('.element__group-title').textContent = item.name;
    imgElement.src = item.link;
    imgElement.alt = item.name;

    card.querySelector('.element__trash').addEventListener('click', deleteCard); // вешаем слушатель на корзину карточки
    card.querySelector('.element__like').addEventListener('click', likeCard); // вешаем слушатель на Лайк карточки

    imgElement.addEventListener('click', () => { //вешаем слушатель на фото, по которому открывается попап
      popupImg.src = item.link;
      popupImg.alt = item.name;
      popupPhotoName.textContent = item.name;
      openPopup(popupPhoto);
    });

    return card;
}

function renderCards(items) { //добавление карточек через создание нового массива карточек
  const cards = items.map((item) => {
    return createCard(item);
  });

  elementsContainer.prepend(...cards);
}
renderCards(initialCards);


// РЕАЛИЗАЦИЯ ПОПАПОВ
const openPopup = function (popup) { //добавление класса для откытия попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function openPopupInfo() {
  inputName.value =  titleName.textContent; // реализация получения ранее введенных данных в Input
  inputJob.value = subtitle.textContent;
  openPopup(popupInfo);
  clearErrors();
}

function openPopupCards() { //открытие попапа для карточек
  openPopup(popupCards);
}

function closePopup(popup) { //можно реализовать через одну функцию, вместо add и remove - использовать toggle, задав 1 переменную togglePopupVisibility вместо openPopup и closePopup
  popup.classList.remove('popup_opened'); // реализация функции закрытия попапа
  document.removeEventListener('keydown', closeByEsc);
}

popupCloseButtons.forEach(button => {// делаем перебор кнопок попапа
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));//запустили закрытие выбранного попапа по клику на кнопку
})

function closeByEsc(evt) { //закрытие попапа по Esc
  if (evt.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

popupElement.forEach(popup => { //закрытие попала по клику на Оверлей
  popup.addEventListener("mousedown", (evt) => {
       if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

function handleFormSubmitInfo (evt) { // Обработчик «отправки» формы для профиля
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleName.textContent = inputName.value;
  subtitle.textContent = inputJob.value;
  closePopup(popupInfo);
}

function handleFormSubmitCards (evt) { // Обработчик «отправки» формы для карточек
  evt.preventDefault();
  const newCard = {};
  newCard.name = inputPhotoName.value;
  newCard.link = inputPhotoLink.value;

  elementsContainer.prepend(createCard(newCard));
  closePopup(popupCards);

  formPopupCards.reset(); //очистка полей формы после отправки формы

  clearErrors();
}

// Регистрируем обработчики событий по клику
popupInfoOpen.addEventListener('click', openPopupInfo); //открытие попапа с профилем пользователя
popupCardsOpen.addEventListener('click', openPopupCards); //открытие попапа добавления новой карточки

formElementInfo.addEventListener('submit', handleFormSubmitInfo); // сохранение данных на сайте при нажатии кнопки Сохранить
formElementCards.addEventListener('submit', handleFormSubmitCards);
