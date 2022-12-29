import React from "react";
import './NavTab.css';

function NavTab() {
    return (
        <section className="nav-tab">
            <nav className="nav-tab__container">
                <ul className="nav-tab__elements">
                    <li className="nav-tab__element"><a className="nav-tab__element" href="">О проекте</a></li>
                    <li className="nav-tab__element"><a className="nav-tab__element" href="">Технологии</a></li>
                    <li className="nav-tab__element"><a className="nav-tab__element" href="">Студент</a></li>
                </ul>
            </nav>
        </section>
    )
  }
  
  export default NavTab;