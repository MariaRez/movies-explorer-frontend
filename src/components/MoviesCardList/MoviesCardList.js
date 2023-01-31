import React, { useEffect, useState } from "react";
import { defineListDisplay } from "../../utils/secondaryFunctions";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({
  movies,
  toggleLike,
  filterStatus,
  isSavedPage,
}) {

  // состояние для дополнительных карточек - которые отрисовываются при нажатии на Еще - количество определяется в зависимости от ширины экрана
  const [more, setMore] = useState(3);
  const [amount, setAmount] = useState(0);
  const [renderMovies, setRenderMovies] = useState([]);

  function renderMore() {
    const count = Math.min(movies.length, amount + more);
    const extraMovies = movies.slice(amount, count);
    setRenderMovies([...renderMovies, ...extraMovies]);
    setAmount(count);
  }

  // переключатель для отрисовки в зависимости от ширины экрана
  function handleResize() {
    const width = window.innerWidth;
    const sizePortion = defineListDisplay(width);
    setMore(sizePortion.extra);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const width = window.innerWidth;
    const sizePortion = defineListDisplay(width);
    setMore(sizePortion.extra);
    const count = Math.min(movies.length, sizePortion.first);
    setRenderMovies(movies.slice(0, count));
    setAmount(count);
  }, [movies]);

  function handleMoreCards() {
    renderMore();
  }

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">
        {isSavedPage &&
          movies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              onLikeClick={toggleLike}
              filterStatus={filterStatus}
            />
          ))}

        {!isSavedPage &&
          renderMovies.map((movie) => (
            <MoviesCard
              key={movie.movieId}
              movie={movie}
              onLikeClick={toggleLike}
              filterStatus={filterStatus}
            />
          ))}
      </ul>

      {!isSavedPage && amount < movies.length && (
        <button
          className="movies-card-list__more-button"
          aria-label="Load more movies"
          onClick={handleMoreCards}
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
