import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./Profile.css";

function Profile({ onUpdateUser, handleExit, errorMessage }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const checkValid = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));
  const submitButtonClassName = `form__button form__button_type_change ${checkValid ? "form__button_disabled": ""}`;

   useEffect(() => {
    resetForm(currentUser, "", false);
  }, [currentUser, resetForm]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      email: values.email
    });
  }

  return (
    <section className="profile">
      <h3 className="profile__title">Привет, {currentUser?.name}!</h3>
      <form name="profile" className="form" onSubmit={handleSubmit}>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="name">
            Имя
          </label>
          <input
            className="form__input"
            type="text"
            name="name"
            id="name"
            required
            minLength="2"
            maxLength="40"
            pattern="^[A-Za-zА-Яа-яЁё /s -]+$"
            placeholder="Ваше новое имя"
            value={values.name || ""}
            onChange={handleChange}
          />
        </fieldset>
        <span className="profile__error" id="name-error">{errors.name || ""}</span>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="form__input"
            type="email"
            name="email"
            id="email"
            pattern="^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$"
            required
            minLength="2"
            placeholder="Ваша новая почта"
            value={values.email || ""}
            onChange={handleChange}
          />
        </fieldset>
        <span className="profile__error" id="email-error">{errors.email || ""}</span>
        <p className="profile__error-server">{errorMessage}</p>
        <button
          className={submitButtonClassName}
          type="submit"
          aria-label="Change data"
          disabled={checkValid ? true : false}>
            Редактировать
        </button>
      </form>
      <button
        className="form__button form__button_type_exit"
        aria-label="Exit"
        type="button"
        onClick={handleExit}
      >
        Выйти из аккаунта
      </button>
    </section>
  );
}

export default Profile;
