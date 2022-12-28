import React from "react";
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__text">Портфолио</h3>
            <ul className='portfolio__links'>
                <li className="portfolio__link-container">
                    <p className='portfolio__link-text'>Статичный сайт</p>
                    <button
                    aria-label="Link to portfolio"
                    type="button"
                    className="portfolio__link-button">↗</button>
                </li>
                <li className="portfolio__link-container">
                    <p className='portfolio__link-text'>Адаптивный сайт</p>
                    <button
                    aria-label="Link to portfolio"
                    type="button"
                    className="portfolio__link-button">↗</button>
                </li>
                <li className="portfolio__link-container">
                    <p className='portfolio__link-text'>Одностраничное приложение</p>
                    <button
                    aria-label="Link to portfolio"
                    type="button"
                    className="portfolio__link-button">↗</button>
                </li>
            </ul>
        </section>
    )
  }
  
  export default Portfolio;