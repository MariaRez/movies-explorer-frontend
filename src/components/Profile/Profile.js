import React from "react";
import './Profile.css';

function Profile() {
    return (
        <section className="profile">
            <h3 className="profile__title">Привет, !</h3>
            <form className="form">
                <fieldset  className="form__fieldset">
                    <label 
                    className="form__label"
                    htmlFor="name">Имя</label>
                    <input
                    className="form__input"
                    type="text"
                    name="name"
                    id="name"
                    required
                    minLength="2"
                    maxLength="40"
                    placeholder="Ваше имя"
                    />
                </fieldset>
                <span 
                    className="error error_active"
                    id="name-error"></span>
                <fieldset className="form__fieldset">
                    <label
                    className="form__label"
                    htmlFor="email">E-mail</label>
                    <input
                    className="form__input"
                    type="email"
                    name="email"
                    id="email"
                    required
                    minLength="2"
                    placeholder="Ваша почта"
                    />
                    </fieldset>
                    <span
                    className="error"
                    id="email-error"></span>
                <button
                className="form__button form__button_type_change"
                aria-label="Change data"
                type="submit">Редактировать</button>
            </form>
            <button
            className="form__button form__button_type_exit"
                aria-label="Exit"
                type="button">Выйти из аккаунта</button>
        </section>
    )
  }
  
  export default Profile;