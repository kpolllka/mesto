import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popup, handleFormSubmit) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._form = this._popup.querySelector('.popup__form');
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
}
