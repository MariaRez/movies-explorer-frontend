import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">
        {movies.map((card, id) => {
          return (
            <MoviesCard
              key={id}
              title={card.title}
              duration={card.duration}
              link={card.link}
              isLiked={card.isLiked}
              trailerLink={card.trailerLink}
            />
          );
        })}
      </ul>
      <button className="movies-card-list__more-button">Еще</button>
    </section>
  );
}

export default MoviesCardList;
