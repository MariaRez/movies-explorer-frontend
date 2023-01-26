import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

function MoviesCard({ isLiked, link, title, duration, trailerLink }) {
  const location = useLocation();
  const cardLikeButtonClassName = `card__like ${ isLiked ? "card__like_active" : ""}`;
  // для лайка карточки с фильмом - при лайке попадает в сохраненные
  function handleLikeMovies() {

  }
  // для удаления лайка карточки - удаляется из сохраненных
  function handleDeleteLikeMovies() {

  }

  return (
    <div className="card">
      <a href={trailerLink} target="_blank" rel="noreferrer"><img className="card__image" src={link} alt={title} /></a> 
      {/* картинка фильма является ссылкой для перехода на трейлер фильма */}
      <div className="card__container">
        <h3 className="card__title">{title}</h3>
        {location.pathname === "/movies" ? (
          <button
            aria-label="Like card"
            className={cardLikeButtonClassName}
            type="button"
          />
        ) : (
          <button
            aria-label="Delete card"
            className="card__delete"
            type="button"
          />
        )}
      </div>
      <p className="card__duration">{duration}</p>
    </div>
  );
}

export default MoviesCard;
