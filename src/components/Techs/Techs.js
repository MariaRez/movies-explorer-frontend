import React from "react";
import './Techs.css';

function Techs() {
    return (
        <section className="techs" id="techs">
            <h2 className="techs__text">Технологии</h2>
            <p className="techs__about">7 технологий</p>
            <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className="techs__elements">
                <li className="techs__element">HTML</li>
                <li className="techs__element">CSS</li>
                <li className="techs__element">JS</li>
                <li className="techs__element">React</li>
                <li className="techs__element">Git</li>
                <li className="techs__element">Express.js</li>
                <li className="techs__element">mongoDB</li>
            </ul>
        </section>
    )
  }
  
  export default Techs;