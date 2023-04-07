import { Popup } from './Popup.js'

export class PopupWithDelCards extends Popup {
  constructor(selector){
    super(selector)
    this._form = document.querySelector('.popup__form');
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }

  delCardSubmit(action) {
    this._handleSubmit = action;
  }

  // open({cardId, cards}) {
  //   super.open();
  //   this._cardId = cardId;
  //   this._cards = cards;
  // }
}
