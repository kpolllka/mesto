export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {//проверка на ошибку
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", { headers: this._headers }).then(
      (res) => this._getResponse(res)
    );
  }

  getCardsInfo() {
    return fetch(this._url + "/cards", { headers: this._headers }).then((res) =>
      this._getResponse(res)
    );
  }

  setUserEdit(item) { //для изменения профиля
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: item.name, about: item.about }),
    }).then((res) => this._getResponse(res));
  }

  setAvatarEdit(link) { //для изменения аватара
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link.avatar }),
    }).then((res) => this._getResponse(res));
  }

  createNewCards (data) { //для добавления новой карточки
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then(this._getResponse);
  }

  delCard(cardId){ //для удаления карточки
    return fetch (`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._getResponse);
  }


}
