import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./Login.css";

function Login({ handleLogin, errorMessage, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const submitButtonClassName = `login__button ${(!isValid || isLoading) && "login__button_disabled"}`;
  const inputClassName = `login__input ${ isLoading ? "login__input_disabled" : ""}`

  useEffect(() => {
    resetForm("", "", false);
  }, [resetForm]); //сброс формы

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(values.email, values.password);
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
              className={inputClassName}
              type="email"
              name="email"
              id="email"
              required
              placeholder="Ваша почта"
              value={values.email || ""}
              onChange={handleChange}
              disabled={isLoading ? true : false}
            />
          </fieldset>
          <span className="login__error" id="email-error">{errors.email || ""}</span>
          <fieldset className="login__fieldset">
            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              className={inputClassName}
              type="password"
              name="password"
              id="password"
              required
              placeholder="Ваш пароль"
              value={values.password || ""} 
              onChange={handleChange}
              disabled={isLoading ? true : false}
            />
          </fieldset>
          <span className="login__error" id="password-error">{errors.password || ""}</span>
          <p className="login__error-server">{errorMessage}</p>
          <button 
            className={submitButtonClassName}
            type="submit"
            disabled={!isValid || isLoading}>
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
