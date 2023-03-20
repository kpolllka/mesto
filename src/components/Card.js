export class Card {
  constructor(data, templateSelector, openPopupPhoto) {
    this._name = data.name;
    this._link = data.link;
    this._data = data;
    this._openPopupPhoto = openPopupPhoto;
    this._templateSelector = templateSelector;
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

    this._setEventListeners();
    return this._card;
  }

  _removeCard() { //метод удаления карточки
    this._card.remove();
    this._card = null
  }

  _likeCard() { //метод лайка карточки
    this._like.classList.toggle('element__like_active');
  }

  _setEventListeners() {
    this._trash.addEventListener('click', () => { // вешаем слушатель на корзину карточки
        this._removeCard();
      });

    this._like.addEventListener('click', () => { // вешаем слушатель на лайк карточки
        this._likeCard();
      });

    this._imgElement.addEventListener('click', () => { //вешаем слушатель на фото, по которому открывается попап
        this._openPopupPhoto (this._data)
      });
  }
}
