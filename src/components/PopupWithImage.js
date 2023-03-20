import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._popupImg = this._popup.querySelector('.popup__container-img');
    this._popupTitle = this._popup.querySelector('.popup__container-photo-name');
  }

  open({name, link}) {
    this._popupImg.src = link;
    this._popupImg.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}
