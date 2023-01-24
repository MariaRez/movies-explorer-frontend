import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./Register.css";

function Register({ handleRegister, errorMessage, isActive }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const submitButtonClassName = `register__button ${!isValid && "register__button_disabled"}`;

  useEffect(() => {
    resetForm("", "", false);
  }, [resetForm]); //сброс формы

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(values.name, values.email, values.password);
  }

  return (
    <section className="register">
      <div className="register__container">
        <Link to="/">
          <img className="logo" src={logo} alt="Логотоп" />
        </Link>
        <h3 className="register__title">Добро пожаловать!</h3>
        <form
          name="register"
          className="register__form"
          onSubmit={handleSubmit}
        >
          <fieldset className="register__fieldset">
            <label className="register__label" htmlFor="name">
              Имя
            </label>
            <input
              className="register__input"
              type="name"
              name="name"
              id="name"
              required
              minLength="2"
              maxLength="40"
              pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
              placeholder="Ваше имя"
              value={values.name || ""}
              onChange={handleChange}
            />
          </fieldset>
          <span className="register__error" id="name-error">{errors.name || ""}</span>
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
              value={values.email || ""} //значение почты или пустая строка
              onChange={handleChange}
            />
          </fieldset>
          <span className="register__error" id="email-error">{errors.email || ""}</span>
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
              value={values.password || ""} //значение пароля или пустая строка
              onChange={handleChange}
            />
          </fieldset>
          <span className="register__error" id="password-error">{errors.password || ""}</span>
          <p className="register__error-server">{errorMessage}</p>
          <button
            className={submitButtonClassName}
            type="submit"
            disabled={!isValid}>
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
