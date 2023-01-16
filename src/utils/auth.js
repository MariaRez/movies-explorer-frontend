// регистрация, авторизация и проверка валидности токена
class Auth {
    constructor({ baseUrl }) {
      this._baseUrl = baseUrl;
    }
  
    _сheckServerResponseStatus(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    register(name, email, password) {
        return fetch(`${this._baseUrl}/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${name}`,
            email: `${email}`,
            password: `${password}`,
          }),
        }).then(this._сheckServerResponseStatus);
      }
    
      login(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: `${email}`,
            password: `${password}`,
          }),
        }).then(this._сheckServerResponseStatus);
      }

      checkToken(token) {
        return fetch(`${this._baseUrl}/users/me`, {
          method: "GET",
          headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }).then(this._сheckServerResponseStatus);
      }
  }
  
  export const auth = new Auth({
    baseUrl: "https://api.mariarez.students.nomoredomains.club",
  });