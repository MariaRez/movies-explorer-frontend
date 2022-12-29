import React from "react";
import './AboutMe.css';
import photo from '../../images/photo.png'

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__text">Студент</h2>
            <div className="about-me__info">
                <div className="about-me__info-text">
                    <p className="about-me__name">Мария</p>
                    <p className="about-me__about">Фронтенд-разработчик, 25 лет</p>
                    <p className="about-me__description">Родилась в городе Санкт-Петербург. Окончила там же Архитектурно-Строительный университет по специальности Экономическая безопасность. После окончания два года работала по специальности. В начале 2022 года решила изменить свою жизнь в лучшую сторону и найти свое призвание. Безумно люблю гулять, читать детективы и околонаучную литературу, готовить и слушать подкасты.</p>
                    <a className="about-me__github" href="https://github.com/MariaRez">Github</a>
                </div>
                <img
                className="about-me__photo"
                src={photo}
                alt="Фотография автора"
                />
            </div>
        </section>
    )
  }
  
  export default AboutMe;