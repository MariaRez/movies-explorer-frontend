import React from "react";
import { Link, useLocation } from "react-router-dom";
import profile from "../../images/profile.svg";
import "./Navigation.css";

function Navigation({ handleBurgerMenuButton }) {
  const location = useLocation();
  
  function defineLinkClass(path) {
    let linkClassName = `navigation__link  ${location.pathname === path ? "navigation__link_checked" : ""}`;
    return linkClassName;
  } 

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
          className={defineLinkClass("/")}
          onClick={handleBurgerMenuButton}
        >
          Главная
        </Link>
        <Link
          to="/movies"
          className={defineLinkClass("/movies")}
          onClick={handleBurgerMenuButton}
        >
          Фильмы
        </Link>
        <Link
          to="/saved-movies"
          className={defineLinkClass("/saved-movies")}
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
