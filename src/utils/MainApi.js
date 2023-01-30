// описание запросов к нашему Api
class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _сheckServerResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._сheckServerResponseStatus);
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${data.name}`,
        email: `${data.email}`,
      }),
    }).then(this._сheckServerResponseStatus);
  }

  getUserMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._сheckServerResponseStatus);
  }

  createMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
         trailer: data.trailer,
         thumbnail: `https://api.nomoreparties.co${data.image.url}`,
         nameRU: data.nameRU,
         nameEN: data.nameEN,
         movieId: data.movieId,
      }),
    }).then(this._сheckServerResponseStatus);
  }

  deleteMovie(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._сheckServerResponseStatus);
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.mariarez.students.nomoredomains.club",
});