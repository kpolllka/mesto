import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._form.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelector('.popup__button');
    this._textSaveButton = this._saveButton.textContent;
  }

  _getInputValues() {
    this._inputsObject = {}; //объект для сбора значений инпутов
    this._inputs.forEach((input) => { // собрали все значения инпутов
      this._inputsObject[input.name] = input.value; //записали в объект
    });
    return this._inputsObject; // вернули объект со значениями
  }

  setInputValues(obj) {
    this._inputs.forEach((input) => {
      input.value = obj[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  renderLoading(isLoading, text = "Сохранение...") {
    if (isLoading) {
      this._saveButton.textContent = text;
    } else {
      this._saveButton.textContent = this._textSaveButton;
    }
  }
}
