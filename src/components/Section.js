export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {//отрисовка карточек
    items.forEach((element) => {
      this._container.append(this._renderer(element));
    });
  }

  addItem(element) {//прописали место и логику добавления карточек
    this._container.prepend(element);
  }
}
