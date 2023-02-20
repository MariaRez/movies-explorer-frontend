import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
    <section className="nav-tab">
      <nav className="nav-tab__container">
        <ul className="nav-tab-elements">
          <li className="nav-tab-element">
            <a className="nav-tab-element-link" href="#about_project">
              О проекте
            </a>
          </li>
          <li className="nav-tab-element">
            <a className="nav-tab-element-link" href="#techs">
              Технологии
            </a>
          </li>
          <li className="nav-tab-element">
            <a className="nav-tab-element-link" href="#about_me">
              Студент
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;
