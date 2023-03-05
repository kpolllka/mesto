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

    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.element__trash').addEventListener('click', (evt) => { // вешаем слушатель на корзину карточки
        evt.target.closest('.element').remove();
      });

    this._card.querySelector('.element__like').addEventListener('click', (evt) => { // вешаем слушатель на Лайк карточки
        evt.target.classList.toggle('element__like_active');
      });

    this._imgElement.addEventListener('click', () => //вешаем слушатель на фото, по которому открывается попап
        this._openPopupPhoto (this._data)
      );
  }
}
