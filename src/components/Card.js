export class Card {
  constructor({data, userId, templateSelector, openPopupPhoto, handleDelCard}) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._data = data;
    this._openPopupPhoto = openPopupPhoto;
    this._templateSelector = templateSelector;
    this._handleDelCard = handleDelCard;
    this._owner = data.owner._id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.element__group-title').textContent = this._name;

    this._imgElement = this._card.querySelector('.element__mask-group');
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;

    this._trash = this._card.querySelector('.element__trash'); //нашли элемент корзины карточки
    this._like = this._card.querySelector('.element__like'); //нашли элемент like карточки

    this._delCardButton();

    this._setEventListeners();
    return this._card;
  }

  removeCard() { //метод удаления карточки
    this._card.remove();
    this._card = null
  }

  _likeCard() { //метод лайка карточки
    this._like.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._trash.addEventListener('click', () => { // вешаем слушатель на корзину карточки
        this._handleDelCard({cardId: this._cardId});
      });

    this._like.addEventListener('click', () => { // вешаем слушатель на лайк карточки
        this._likeCard();
      });

    this._imgElement.addEventListener('click', () => { //вешаем слушатель на фото, по которому открывается попап
        this._openPopupPhoto (this._data)
      });
  }

  _delCardButton() {
    if (this._owner !== this._userId) {
      this._trash.remove();
    }
 }

}
