import "./index.css";
import { initialCards } from "../consts/indexCards.js";
import { Section } from "../components/Section.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithDelCards } from "../components/popupWithDelCard";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";
import {
  elementsContainer,
  avatarButton,
  avatarProfile,
  popupInfo,
  popupCards,
  popupPhoto,
  popupAvatar,
  popupDelCards,
  popupCardsOpen,
  popupInfoOpen,
  titleName,
  subtitle,
  formElementInfo,
  formElementCards,
  formElementAvatar,
  object,
} from "../consts/consts.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "24b8e8ea-23ea-4343-bd2b-f5480fd9b518",
    "Content-Type": "application/json",
  },
});

let userId;
Promise.all([api.getUserInfo(), api.getCardsInfo()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    userInfo.setUserAvatar(user.avatar);
    section.renderItems(cards);
  })
  .catch((error) => console.log(`Ошибка ${error}`));




//ПОПАП ИЗМЕНЕНИЯ АВАТАРА
const handleAvatarFormSubmit = (item) => {
  api
    .setAvatarEdit(item)
    .then((data) => {
      console.log(data);
      userInfo.setUserInfo(data);
    })
    .then(() => popupWithAvatar.close())
    .catch((error) => console.log(`Ошибка ${error}`));
};

const popupWithAvatar = new PopupWithForm(popupAvatar, handleAvatarFormSubmit);

avatarButton.addEventListener("click", () => {
  avatarFormValidation.resetValidation();
  popupWithAvatar.open();
});

popupWithAvatar.setEventListeners();

//ПОПАП ИНФОРМАЦИИ ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo({
  name: titleName,
  job: subtitle,
  avatar: avatarProfile,
});

const handleProfileFormSubmit = (item) => {
  api
    .setUserEdit(item)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .then(() => popupWithInfo.close())
    .catch((error) => console.log(`Ошибка ${error}`));
};

const popupWithInfo = new PopupWithForm(popupInfo, handleProfileFormSubmit);

function openPopupInfo() { //открытие попапа профиля
  popupWithInfo.open();
  popupWithInfo.setInputValues(userInfo.getUserInfo());
}

popupInfoOpen.addEventListener("click", () => { //открытие попапа с профилем пользователя
  infoFormValidation.resetValidation(); //очистка формы от ошибок, которые могли остаться от предыдущего ввода данных
  openPopupInfo();
});
popupWithInfo.setEventListeners();

//ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const handleNewCardsFormSubmit = (data) => {
  api.createNewCards(data).then((res) => {
    section
      .addItem(createCard(res))
  })
  .then(() => popupWithCard.close())
  .catch((error) => console.log(`Ошибка ${error}`));
};

const popupWithCard = new PopupWithForm(popupCards, handleNewCardsFormSubmit);
popupWithCard.setEventListeners();

function openPopupCards() {  //открытие попапа для карточек
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
const createCard = (data) => {
  const newCard = new Card({data: data, userId: userId, templateSelector: "#template-element", openPopupPhoto,
  handleDelCard: () => {
    popupWithDelCard.open();
    popupWithDelCard.delCardSubmit(() => {

      api
      .delCard()
      .then(()=>{
        console.log(data.card);
        // newCard.removeCard();
        // popupWithDelCard.close();
      })
      .catch((error)=> console.log(`Ошибка: ${error}`))
      .finally(() => {
        popupWithDelCard.close();
      })
    })


  }
})
return newCard.generateCard(data);
}

// function renderCard(card) {
//   const cardElement = createCard(card);
//   section.addItem(cardElement);
// }
const section = new Section({ renderer: createCard }, elementsContainer);

//ПОПАП УДАЛЕНИЯ КАРТОЧКИ
const popupWithDelCard = new PopupWithDelCards('.popup_delete-cards');
popupWithDelCard.setEventListeners();

//УДАЛЕНИЕ КАРТОЧКИ
// function handleDelCard(card){
//   popupWithDelCard.open(card);
//   popupWithDelCard.delCardSubmit((card) => {

//     api.delCard(card._id)
//     .then(()=>{
//       popupWithDelCard.close();
//       card.removeCard();

//     })
//     .catch((error)=> console.log(`Ошибка: ${error}`))
//   })

// }



//РЕАЛИЗАЦИЯ ВАЛИДАЦИИ ФОРМ ПРОФИЛЯ, КАРТОЧЕК, АВАТАРА
const infoFormValidation = new FormValidator(formElementInfo, object); //экземпляр валидации для профиля
const cardsFormValidation = new FormValidator(formElementCards, object); //экземпляр валидации для добавления карточки
const avatarFormValidation = new FormValidator(formElementAvatar, object);

infoFormValidation.enableValidation(); //запуск валидации в попапе профиля
cardsFormValidation.enableValidation(); //запуск валидации в попапе добавления карточек
avatarFormValidation.enableValidation();
