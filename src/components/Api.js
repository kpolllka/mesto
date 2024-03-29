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

  getUserInfo() { //для получения данных о пользователе
    return fetch(this._url + "/users/me", {
      method: "GET",
      headers: this._headers
    }).then((res) => this._getResponse(res));
  }

  getCardsInfo() { //для получения карточек с сервера
    return fetch(this._url + "/cards", {
      method: "GET",
      headers: this._headers
    }).then((res) => this._getResponse(res));
  }

  setUserEdit(item) { //для изменения профиля
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: item.name, about: item.about })
    }).then((res) => this._getResponse(res));
  }

  setAvatarEdit(link) { //для изменения аватара
    return fetch(this._url + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link.avatar })
    }).then((res) => this._getResponse(res));
  }

  createNewCards (data) { //для добавления новой карточки
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, link: data.link })
    }).then((res) => this._getResponse(res));
  }

  delCard(cardId){ //для удаления карточки
    return fetch (`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._getResponse(res));
  }

  _addLike(cardId) { //для добавления лайков
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then((res) => this._getResponse(res));
  }

  _removeLike(cardId) { //для удаления лайков
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._getResponse(res));
  }

  toggleLike({cardId, isLike}) {
    return isLike ? this._removeLike(cardId) : this._addLike(cardId); //аналог записи в комменте ниже
  //   if (isLike) {
  //     return this._removeLike(cardId);
  //   } else {
  //     return this._addLike(cardId);
  //   }
  }
}
