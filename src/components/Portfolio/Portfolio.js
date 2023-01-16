import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__text">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__link-container">
          <a
            href="https://mariarez.github.io/how-to-learn/"
            rel="noreferrer"
            target="_blank"
            aria-label="Link to portfolio"
            type="button"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Статичный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__link-container">
          <a
            href="https://mariarez.github.io/russian-travel/"
            rel="noreferrer"
            target="_blank"
            aria-label="Link to portfolio"
            type="button"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__link-container">
          <a
            href="https://mariarez.nomoredomains.club"
            rel="noreferrer"
            target="_blank"
            aria-label="Link to portfolio"
            type="button"
            className="portfolio__link"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <p className="portfolio__link-arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
