export class Card {
  constructor({data, userId, templateSelector, openPopupPhoto, handleDelCard, handleLikeCard}) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._owner = data.owner._id;

    this._templateSelector = templateSelector;

    this._openPopupPhoto = openPopupPhoto;

    this._handleDelCard = handleDelCard;

    this._handleLikeCard = handleLikeCard;
    this._likeCounter = data.likes.length;
    this._isLike = data.likes.some(like => like._id === userId);
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
    this._likeCount = this._card.querySelector('.element__like-counter'); //нашли
    this._likeCount.textContent = this._likeCounter;

    // if (this._isLike) {
    //   this._like.classList.add('element__like_active');
    // }

    this._isLike ? this._like.classList.add('element__like_active') : null; //аналог записи в комменте выше

    this._delCardButton();

    this._setEventListeners();
    return this._card;
  }

  //УДАЛЕНИЕ КАРТОЧКИ
  removeCard() {
    console.log(this._cardId)
    this._card.remove();
    this._card = null
  }

  _delCardButton() {
    if (this._owner !== this._userId) {
      this._trash.remove();
    }
 }

  //ЛАЙКИ
  _addLike(data) {
    this._like.classList.add('element__like_active');
    this._likeCount.textContent = data.likes.length;
    this._isLike = true;
  }

  _removeLike(data) {
    this._like.classList.remove('element__like_active');
    this._likeCount.textContent = data.likes.length;
    this._isLike = false;
  }

  cardInfo() {
    return {cardId: this._cardId, isLike: this._isLike};
  }

  setLike(data) {
    if (this._isLike) {
      this._removeLike(data);
    } else {
      this._addLike(data);
    }
  }

  //СЛУШАТЕЛИ
  _setEventListeners() {
    this._trash.addEventListener('click', () => { // вешаем слушатель на корзину карточки
      this._handleDelCard({cardId: this._cardId});
    });

    this._like.addEventListener('click', () => { // вешаем слушатель на лайк карточки
      this._handleLikeCard(this);
    });

    this._imgElement.addEventListener('click', () => { //вешаем слушатель на фото, по которому открывается попап
      this._openPopupPhoto(this._data);
    });
  }
}
