import "./Header.css";
import logo from "../../images/logo.svg";
import { Link, Route, useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();
    const headerClassName = (`header ${ location.pathname === "/" ? 'header_color_emerald' : 'header_color_dark'}`);

    return (
      <header className={headerClassName}>
        <div className="header__container">
            <Link to="/">
                <img className="logo" src={logo} alt="Логотоп" />
            </Link>
            <Route exact path="/">
                <div className="header__links header__links_place_main">
                    <Link to="/signup" className="header__link header__link_to_signup">Регистрация</Link>
                    <Link to="/signin" className="header__link header__link_to_signin">Войти</Link>
                </div>
            </Route>
            <Route exact path="/movies">
                <div className="header__links"></div>
            </Route>
            <Route exact path="/saved-movies">
                <div className="header__links"></div>
            </Route>
            <Route exact path="/profile">
                <div className="header__links"></div>
            </Route>
        </div>
      </header>
  );
}

export default Header;