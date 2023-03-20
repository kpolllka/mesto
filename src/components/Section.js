export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {//отрисовка массива карточек
    this._items.forEach((element) => {
      this._container.append(this._renderer(element));
    });
  }

  addItem(element) {//прописали место и логику добавления карточек
    this._container.prepend(element);
  }
}
