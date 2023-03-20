export class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
    this._HandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._HandleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._HandleEscClose);
  }

  _handleEscClose(evt) { //закрытие попапа по Esc
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleButtonClose(evt) { //закрытие попапа по крестику
    if (evt.target.classList.contains('popup__close-icon')) {
      this.close();
    }
  }

  _handleOverlayClose(evt) { //закрытие попапа по Оверлею
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      this._handleButtonClose(evt);
    });

    this._popup.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    });
  }
}
