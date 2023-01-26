import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">
        {movies.map((card) => {
          return (
            <MoviesCard
              title={card.title}
              duration={card.duration}
              link={card.link}
              isLiked={card.isLiked}
              trailerLink={card.trailerLink}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
