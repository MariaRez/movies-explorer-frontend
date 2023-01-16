import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="logo" src={logo} alt="Логотоп" />
        </Link>
        <h3 className="register__title">Добро пожаловать!</h3>
        <form name="register" className="register__form">
          <fieldset className="register__fieldset">
            <label className="register__label" htmlFor="name">
              Имя
            </label>
            <input
              className="register__input"
              type="text"
              name="name"
              id="name"
              required
              minLength="2"
              maxLength="40"
              placeholder="Ваше имя"
            />
          </fieldset>
          <span className="register__error" id="name-error"></span>
          <fieldset className="register__fieldset">
            <label className="register__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="register__input"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Ваша почта"
            />
          </fieldset>
          <span className="register__error" id="email-error"></span>
          <fieldset className="register__fieldset">
            <label className="register__label" htmlFor="password">
              Пароль
            </label>
            <input
              className="register__input"
              type="password"
              name="password"
              id="password"
              required
              placeholder="Ваш пароль"
            />
          </fieldset>
          <span className="register__error" id="password-error"></span>
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
