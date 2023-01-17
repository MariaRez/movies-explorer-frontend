import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ isOpen, onUpdateUser, handleExit }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser, isOpen]);

  function handleNameEdit(evt) {
    setName(evt.target.value);
  }

  function handleEmailEdit(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      email: email,
    });
  }

  return (
    <section className="profile">
      <h3 className="profile__title">Привет, {name}!</h3>
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
            placeholder="Ваше имя"
            value={name}
            onChange={handleNameEdit}
          />
        </fieldset>
        <span className="error" id="name-error"></span>
        <fieldset className="form__fieldset">
          <label className="form__label" htmlFor="email">
            E-mail
          </label>
          <input
            className="form__input"
            type="email"
            name="email"
            id="email"
            required
            minLength="2"
            placeholder="Ваша почта"
            value={email}
            onChange={handleEmailEdit}
          />
        </fieldset>
        <span className="error" id="email-error"></span>
        <button
          className="form__button form__button_type_change"
          aria-label="Change data"
          type="submit"
        >
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
