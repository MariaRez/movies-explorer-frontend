// описание запросов к сервису beatfilm-movies
class MoviesApi {
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
  
  export const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  });