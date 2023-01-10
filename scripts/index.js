// Делаем выборку DOM элементов
const popupElement = document.querySelector('.popup'); // определили элемент попап
const popupCloseButtonElement = popupElement.querySelector('.popup__close-icon'); // определили кнопку закрытия попапа, сузили обл поиска со всего документа, до секции попапа
const popupOpenButtonElement = document.querySelector('.profile__edit-button'); // определили кнопку открытия попапа
const titleName = document.querySelector('.profile__title-name');
const subtitle = document.querySelector('.profile__subtitle');
const inputName = popupElement.querySelector('.popup__input_info_name');
const inputJob = popupElement.querySelector('.popup__input_info_job');
let formElement = popupElement.querySelector('.popup__form');

// пишем функции
function openPopup() {
  popupElement.classList.add('popup_opened'); // реализация функции открытия попапа
  inputName.value =  titleName.textContent; // реализация получения ранее введенных данных в Input
  inputJob.value = subtitle.textContent; // реализация получения ранее введенных данных в Input
}

function closePopup() { //можно реализовать через одну функцию, вместо add и remove - использовать toggle, задав 1 переменную togglePopupVisibility вместо openPopup и closePopup
  popupElement.classList.remove('popup_opened'); // реализация функции закрытия попапа
};

function handleFormSubmit (evt) { // Обработчик «отправки» формы
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  titleName.textContent = inputName.value;
  subtitle.textContent = inputJob.value;
  closePopup();
}

// Регистрируем обработчики событий по клику
popupOpenButtonElement.addEventListener('click', openPopup); //открытие попапа, можно реализовать одой функцией используя переменную togglePopupVisibility вместо openPopup
popupCloseButtonElement.addEventListener('click', closePopup); //закрытие попапа, можно реализовать одой функцией используя переменную togglePopupVisibility вместо closePopup
formElement.addEventListener('submit', handleFormSubmit); // сохранение данных на сайте при нажатии кнопки Сохранить
