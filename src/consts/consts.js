//Выборка элементов для работы с карточками
export const elementsContainer = ".elements";

export const avatarProfile = ".profile__avatar";
export const avatarButton = document.querySelector('.profile__avatar-edit');

//Сделали выборку 3х попапов
export const popupInfo = ".popup_info";
export const popupCards = ".popup_cards";
export const popupPhoto = ".popup_photo";
export const popupAvatar = ".popup_avatar";
export const popupDelCards = ".popup_delete-cards";

//Сделали выборку кнопок открытия для 2х попапов (профиля и добавления карточек)
export const popupCardsOpen = document.querySelector(".profile__add-button");
export const popupInfoOpen = document.querySelector(".profile__edit-button");

//Переменные для заполнения Инпутов popupInfo
export const titleName = ".profile__title-name";
export const subtitle = ".profile__subtitle";

//Переменная для отправки формы попапа
export const formElementInfo = document.querySelector(".popup__form-info");
export const formElementCards = document.querySelector(".popup__form-cards");
export const formElementAvatar = document.querySelector(".popup__form-avatar");

//Объект для валидации
export const object = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
