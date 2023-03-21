import './index.css';
import { initialCards } from "../consts/indexCards.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  elementsContainer,
  popupInfo,
  popupCards,
  popupPhoto,
  popupCardsOpen,
  popupInfoOpen,
  titleName,
  subtitle,
  formElementInfo,
  formElementCards,
  object,
} from "../consts/consts.js";

//ПОПАП ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo({ name: titleName, job: subtitle });

const handleProfileFormSubmit = ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
};

const popupWithInfo = new PopupWithForm(popupInfo, handleProfileFormSubmit);
popupWithInfo.setEventListeners();

function openPopupInfo() { //открытие попапа профиля
  popupWithInfo.open();
  popupWithInfo.setInputValues(userInfo.getUserInfo());
}

popupInfoOpen.addEventListener("click", () => { //открытие попапа с профилем пользователя
  infoFormValidation.resetValidation(); //очистка формы от ошибок, которые могли остаться от предыдущего ввода данных
  openPopupInfo();
});



//ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupWithCard = new PopupWithForm(popupCards, renderCard);
popupWithCard.setEventListeners();

function openPopupCards() { //открытие попапа для карточек
  cardsFormValidation.resetValidation(); //очистка полей формы после отправки формы
  popupWithCard.open();
}
popupCardsOpen.addEventListener("click", openPopupCards);



//ПОПАП ОТКРЫТИЯ КАРТОЧКИ НА СТРАНИЦЕ
const popupWithImage = new PopupWithImage(popupPhoto);
popupWithImage.setEventListeners();

const openPopupPhoto = (obj) => {
  popupWithImage.open(obj);
};



//ОТРИСОВКА КАРТОЧЕК МАССИВА
function createCard(card) {
  return new Card(card, "#template-element", openPopupPhoto).generateCard();
}

function renderCard(card) {
  const cardElement = createCard(card);
  section.addItem(cardElement);
}

const section = new Section(
  { items: initialCards, renderer: createCard },
  elementsContainer
);
section.renderItems();



//РЕАЛИЗАЦИЯ ВАЛИДАЦИИ ФОРМ ПРОФИЛЯ И КАРТОЧЕК
const infoFormValidation = new FormValidator(formElementInfo, object); //экземпляр валидации для профиля
const cardsFormValidation = new FormValidator(formElementCards, object); //экземпляр валидации для добавления карточки

infoFormValidation.enableValidation(); //запуск валидации в попапе профиля
cardsFormValidation.enableValidation(); //запуск валидации в попапе добавления карточек
