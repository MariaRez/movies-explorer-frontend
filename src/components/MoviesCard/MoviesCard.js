import React from "react";
import { useLocation } from "react-router-dom";
import { getTimeFromMins } from "../../utils/secondaryFunctions";
import "./MoviesCard.css";

function MoviesCard({ movie, filterStatus, onLikeClick }) {
  const location = useLocation();
  const isLiked = filterStatus(movie);
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;

  function handleClick() {
    onLikeClick(movie, isLiked);
  }
  return (
    <div className="card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className="card__image" src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU} />
      </a>
      {/* картинка фильма является ссылкой для перехода на трейлер фильма */}
      <div className="card__container">
        <h3 className="card__title">{movie.nameRU}</h3>
        {location.pathname === "/movies" ? (
          // на странице с фильмами - лайк/сохранение
          <button
            aria-label="Like card"
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleClick}
          />
        ) : (
          // на странице с сохраненными фильмами - удаление
          <button
            aria-label="Delete card"
            className="card__delete"
            type="button"
            onClick={handleClick}
          />
        )}
      </div>
      <p className="card__duration">{getTimeFromMins(movie.duration)}</p>
    </div>
  );
}

export default MoviesCard;
