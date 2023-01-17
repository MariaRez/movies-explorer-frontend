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
}

export const mainApi = new MainApi({
  baseUrl: "https://api.mariarez.students.nomoredomains.club",
});
