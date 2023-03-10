import { initialCards } from './indexCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//Выборка элементов для работы с карточками
const elementsContainer = document.querySelector('.elements'); //определили место, куда вставляем карточки
const popupImg = document.querySelector('.popup__container-img');
const popupPhotoName = document.querySelector('.popup__container-photo-name');

//сделали выборку 3х попапов
const popupElement = document.querySelectorAll('.popup');
const popupInfo = document.querySelector('.popup_info'); //определили попап редактирования профиля пользователя
const popupCards = document.querySelector('.popup_cards'); //определили попап добавления новой карточки
const popupPhoto = document.querySelector('.popup_photo'); //определили попап просмотра карточки

//сделали выборку кнопок открытия для 2х попапов (профиля и добавления карточек)
const popupInfoOpen = document.querySelector('.profile__edit-button');
const popupCardsOpen = document.querySelector('.profile__add-button');

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

//переменная для очистки Инпутов в popupCards после отправки формы
const formPopupCards = popupCards.querySelector('#form-popup_cards');

// Объект для валидации
const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// РЕАЛИЗАЦИЯ ПОПАПОВ
const openPopup = function (popup) {
  popup.classList.add('popup_opened'); //добавление класса для откытия попапа
  document.addEventListener('keydown', closeByEsc);
};

function openPopupInfo() { //открытие попапа профиля
  inputName.value = titleName.textContent; // реализация получения ранее введенных данных в Input
  inputJob.value = subtitle.textContent;
  openPopup(popupInfo);
}

function openPopupCards() { //открытие попапа для карточек
  openPopup(popupCards);
}

function openPopupPhoto(item) { //отрытие попапа фотографии
  popupImg.src = item.link;
  popupImg.alt = item.name;
  popupPhotoName.textContent = item.name;
  openPopup(popupPhoto);
}

function closePopup(popup) {  //можно реализовать через одну функцию, вместо add и remove - использовать toggle, задав 1 переменную togglePopupVisibility вместо openPopup и closePopup
  popup.classList.remove('popup_opened'); // реализация функции закрытия попапа
  document.removeEventListener('keydown', closeByEsc);
}

popupCloseButtons.forEach((button) => {  // делаем перебор кнопок попапа
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup)); //запустили закрытие выбранного попапа по клику на кнопку
});

function closeByEsc(evt) {  //закрытие попапа по Esc
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

popupElement.forEach((popup) => {  //закрытие попала по клику на Оверлей
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
});

// ОТРИСОВКА КАРТОЧЕК МАССИВА
function createCard(card) { //создали новую карточку
  return new Card(card, '#template-element', openPopupPhoto).generateCard();
}

function renderCard(card) { //прописали место и логику добавления карточек
  elementsContainer.append(createCard(card));
}

initialCards.forEach((card) => { //отрисовали карточки из массива
  renderCard(card);
});

// РЕАЛИЗАЦИЯ ОТПРАВКИ ФОРМ
function handleFormSubmitCards(evt) {  //обработчик «отправки» формы для карточек
  evt.preventDefault(); //эта строчка отменяет стандартную отправку формы.
  const newCard = {};
  newCard.name = inputPhotoName.value;
  newCard.link = inputPhotoLink.value;

  elementsContainer.prepend(createCard(newCard)); //добавление новой карточки

  closePopup(popupCards);

  formPopupCards.reset(); //очистка полей формы после отправки формы
}

function handleFormSubmitInfo(evt) { // Обработчик «отправки» формы для профиля
  evt.preventDefault();
  titleName.textContent = inputName.value;
  subtitle.textContent = inputJob.value;
  closePopup(popupInfo);
}

// РЕАЛИЗАЦИЯ ВАЛИДАЦИИ ФОРМ ПРОФИЛЯ И КАРТОЧЕК
const infoFormValidation = new FormValidator (formElementInfo, object); //экземпляр валидации для профиля
const cardsFormValidation = new FormValidator (formElementCards, object); //экземпляр валидации для добавления карточки

infoFormValidation.enableValidation(); //запуск валидации в попапе профиля
cardsFormValidation.enableValidation(); //запуск валидации в попапе добавления карточек

// РЕГИСТРИРУЕМ ОБРАБОТЧИКИ СОБЫТИЙ ПО КЛИКУ
popupInfoOpen.addEventListener('click', () => { //открытие попапа с профилем пользователя
  infoFormValidation.resetValidation(); //очистка формы от ошибок, которые могли остаться от предыдущего ввода данных
  openPopupInfo();
});

popupCardsOpen.addEventListener('click', () => { //открытие попапа добавления новой карточки
  cardsFormValidation.resetValidation(); //очистка формы от ошибок, которые могли остаться от предыдущего ввода данных
  openPopupCards();
});


formElementInfo.addEventListener('submit', handleFormSubmitInfo); // сохранение данных профиля на сайте при нажатии кнопки Сохранить
formElementCards.addEventListener('submit', handleFormSubmitCards); // сохранение данных карточки на сайте при нажатии кнопки Сохранить
