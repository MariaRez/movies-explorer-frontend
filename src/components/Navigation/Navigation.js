import React from "react";
import { Link } from "react-router-dom";
import profile from "../../images/profile.svg";
import "./Navigation.css";

function Navigation({ handleBurgerMenuButton }) {
  return (
    <section className="navigation">
      <p className="navigation__overlay" />
      <button
        aria-label="Close navigation"
        className="navigation__close-button"
        type="button"
        onClick={handleBurgerMenuButton}
      />
      <nav className="navigation__links">
        <Link
          to="/"
          className="navigation__link"
          onClick={handleBurgerMenuButton}
        >
          Главная
        </Link>
        <Link
          to="/movies"
          className="navigation__link navigation__link_checked"
          onClick={handleBurgerMenuButton}
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className="navigation__link"
          onClick={handleBurgerMenuButton}
        >
          Сохранённые фильмы
        </Link>
        <Link
          to="/profile"
          className="navigation__link"
          onClick={handleBurgerMenuButton}
        >
          <img className="navigation__link-image" src={profile} alt="Профиль" />
        </Link>
      </nav>
    </section>
  );
}

export default Navigation;
