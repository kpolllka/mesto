//Выборка элементов для работы с карточками
const elementTemplate = document.querySelector('#template-element').content.querySelector('.element'); //нашли template-элемент и внутри него нашли карточку со страницы
const elementsContainer = document.querySelector('.elements'); //определили место, куда вставляем карточки
const popupImg =  document.querySelector('.popup__container-img');
const popupPhotoName = document.querySelector('.popup__container-photo-name');

//сделали выборку 3х попапов
const popupInfo = document.querySelector('.popup_info');
const popupCards = document.querySelector('.popup_cards');
const popupPhoto = document.querySelector('.popup_photo');

//сделали выборку кнопок открытия для каждого из 3х попапов
const popupInfoOpen = document.querySelector('.profile__edit-button');
const popupCardsOpen = document.querySelector('.profile__add-button');
const popupPhotoOpen = document.querySelector('.element__mask-group');

//сделали выборку кнопок закрытия для каждого из 3х попапов
const popupCloseButtons = document.querySelectorAll('.popup__close-icon');

//переменные для заполнения Инпутов popupInfo
const titleName = document.querySelector('.profile__title-name');
const subtitle = document.querySelector('.profile__subtitle');
const inputName = popupInfo.querySelector('.popup__input_info_name');
const inputJob = popupInfo.querySelector('.popup__input_info_job');

//переменные для заполнения Инпутов popupCards
const inputPhotoName = popupCards.querySelector('.popup__input_photo_name');
const inputPhotoLink = popupCards.querySelector('.popup__input_photo_link');

//переменная для отправки формы попапа
const formElementInfo = document.querySelector('.popup__form-info');
const formElementCards = document.querySelector('.popup__form-cards');


//РАБОТА С КАРТОЧКАМИ
function deleteCard (evt) { //удаление карточки по клику на корзину
  evt.target.closest('.element').remove();
}

function likeCard (evt) { //лайк и не лайк карточки
  evt.target.classList.toggle('element__like_active');
}

function createCard(item) { //создание карточки
  const card = elementTemplate.cloneNode(true);
    card.querySelector('.element__group-title').textContent = item.name;
    card.querySelector('.element__mask-group').src = item.link;
    card.querySelector('.element__mask-group').alt = item.name;

    card.querySelector('.element__trash').addEventListener('click', deleteCard); // вешаем слушатель на корзину карточки
    card.querySelector('.element__like').addEventListener('click', likeCard); // вешаем слушатель на Лайк карточки

    const viewPhoto = card.querySelector('.element__mask-group');
    viewPhoto.addEventListener('click', () => { //вешаем слушатель на фото, по которому открывается попап
      popupImg.src = item.link;
      popupImg.alt = item.name;
      popupPhotoName.textContent = item.name;
      togglePopup(popupPhoto);
    });

    return card;
}

function renderCards(items) { // вариант реализации добавления карточек через создание нового массива карточек
  const cards = items.map((item) => {
    return createCard(item);
  });

  elementsContainer.prepend(...cards);
}
renderCards(initialCards);


// РЕАЛИЗАЦИЯ ПОПАПОВ
const togglePopup = function (popup) { //добавление и удаление класса для открытого попапа
  popup.classList.toggle('popup_opened');
}

function openPopupInfo() {
  inputName.value =  titleName.textContent; // реализация получения ранее введенных данных в Input
  inputJob.value = subtitle.textContent;
  togglePopup(popupInfo);
}

function openPopupCards() { //открытие попапа для карточек
  togglePopup(popupCards);
}

popupCloseButtons.forEach(button => {// делаем перебор кнопок попапа
  const popup = button.closest('.popup');
  button.addEventListener('click', () => togglePopup(popup)); // запустили закрытие выбранного попапа по клику на кнопку
})

function handleFormSubmitInfo (evt) { // Обработчик «отправки» формы для профиля
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleName.textContent = inputName.value;
  subtitle.textContent = inputJob.value;
  togglePopup(popupInfo);
}

function handleFormSubmitCards (evt) { // Обработчик «отправки» формы для карточек
  evt.preventDefault();
  const newCard = {};
  newCard.name = inputPhotoName.value;
  newCard.link = inputPhotoLink.value;

  elementsContainer.prepend(createCard(newCard));
  togglePopup(popupCards);
  inputPhotoName.value = '';
  inputPhotoLink.value = '';
}


// Регистрируем обработчики событий по клику
popupInfoOpen.addEventListener('click', openPopupInfo); //открытие попапа
popupCardsOpen.addEventListener('click', openPopupCards);

formElementInfo.addEventListener('submit', handleFormSubmitInfo); // сохранение данных на сайте при нажатии кнопки Сохранить
formElementCards.addEventListener('submit', handleFormSubmitCards);
