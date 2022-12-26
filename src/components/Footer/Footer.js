import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <nav>
            <ul className='footer__links'>
                <li><a className='footer__link' href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
                <li><a className='footer__link' href="https://github.com/MariaRez" target="_blank" rel="noopener noreferrer">Github</a></li>
            </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer;