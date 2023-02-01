import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { defineListDisplay } from "../../utils/secondaryFunctions";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  movies,
  toggleLike,
  filterStatus,
}) {

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">
        {movies.map((movie) => (
            <MoviesCard
              key={movie.id || movie.movieId}
              movie={movie}
              onLikeClick={toggleLike}
              filterStatus={filterStatus}
            />
          ))}
      </ul>
        <button
        className="movies-card-list__more-button"
        aria-label="Load more movies">
        Еще </button>
    </section>
  );
}

export default MoviesCardList;
