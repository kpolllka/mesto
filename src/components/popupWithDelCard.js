import { Popup } from './Popup.js'

export class PopupWithDelCards extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__button');
    this._saveButton = this._form.querySelector('.popup__button');
    this._textSaveButton = this._saveButton.textContent;
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

  renderLoading(isLoading, text = "Удаление...") {
    if (isLoading) {
      this._saveButton.textContent = text;
    } else {
      this._saveButton.textContent = this._textSaveButton;
    }
  }
}
