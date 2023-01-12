import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link, Route, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {

    const location = useLocation();
    const headerClassName = (`header ${location.pathname === "/" ? 'header_color_emerald' : 'header_color_dark'}`);

    return (
      <header className={headerClassName}>
        <div className="header__container">
            <Link to="/">
                <img className="logo" src={logo} alt="Логотоп" />
            </Link>
            <div className="header__links">
            {location.pathname === "/" ? // для главной страницы
            <>
              <Link to="/signup" className="header__link header__link_color_white">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_color_green">Войти</Link>
            </> : // для иных на которых есть header
            <>
              <Link to="/movies" className="header__link header__link_color_white">Фильмы</Link>
              <Link to="/saved-movies" className="header__link header__link_right header__link_color_white">Сохранённые фильмы</Link>
              <Link to="/profile" className="header__link"><img className="header__link-image" src={profile} alt="Профиль" /></Link>
            </>
            }
             </div>
        </div>
      </header>
  );
}

export default Header;