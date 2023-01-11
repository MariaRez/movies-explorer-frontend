import React from 'react'
import { useLocation } from "react-router-dom";
import './MoviesCard.css'

function MoviesCard ({ isLiked, link, title, duration}) {
    const cardLikeButtonClassName = (`card__like ${ isLiked ? 'card__like_active' : ''}`);
    const location = useLocation();
    return (
        <div className="card">
          <img className="card__image" src={link} alt={title} />
          <div className="card__container">
            <h3 className="card__title">{title}</h3>
            {location.pathname === "/movies" ? <button aria-label="Like card" className={cardLikeButtonClassName} type="button"/> : <button aria-label="Delete card" className="card__delete" type="button"/>}
          </div>
          <p className="card__duration">{duration}</p>
        </div>
      );
};

export default MoviesCard;