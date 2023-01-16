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
  }
  
  export const mainApi = new MainApi({
    baseUrl: "https://api.mariarez.students.nomoredomains.club",
  });
  