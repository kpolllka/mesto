//Выборка элементов для работы с карточками
const elementTemplate = document.querySelector('#template-element').content.querySelector('.element'); //нашли template-элемент и внутри него нашли карточку со страницы
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
