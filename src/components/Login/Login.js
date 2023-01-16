import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleLoginPassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(email, password);
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/">
          <img className="logo" src={logo} alt="Логотоп" />
        </Link>
        <h3 className="login__title">Рады видеть!</h3>
        <form
          name="login"
          className="login__form"
          onSubmit={handleSubmit}
          >
          <fieldset className="login__fieldset">
            <label className="login__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="login__input"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Ваша почта"
              value={email}
              onChange={handleLoginEmail}
            />
          </fieldset>
          <span className="login__error" id="email-error"></span>
          <fieldset className="login__fieldset">
            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="login__input"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Ваш пароль"
              value={password}
              onChange={handleLoginPassword}
            />
          </fieldset>
          <span className="login__error" id="password-error"></span>
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
        <div className="login__signin">
          <p className="login__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
