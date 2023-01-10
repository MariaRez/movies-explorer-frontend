import React from "react";
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about_project">
             <h2 className="about-project__text">О проекте</h2>
             <div className="about-project__info">
                <div className="about-project__info-column">
                    <h3 className="about-project__info-text">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__info-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__info-column">
                    <h3 className="about-project__info-text">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__info-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
             </div>
             <div className="about-project__illustration">
                <div className="about-project__illustration-container">
                    <p className="about-project__illustration_image about-project__illustration_image_back">1 неделя</p>
                    <p className="about-project__illustration_image about-project__illustration_image_front">4 недели</p>
                </div>
                <div className="about-project__illustration-container">
                    <p className="about-project__illustration_image about-project__illustration_image_back-text">Back-end</p>
                    <p className="about-project__illustration_image about-project__illustration_image_front-text">Front-end</p>
                </div>
             </div>
        </section>
    )
  }
  
  export default AboutProject;