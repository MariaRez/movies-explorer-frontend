import React, { useEffect, useState } from "react";
import {
  LARGE_EXTRA_AMOUNT,
  LARGE_ORIGINAL_AMOUNT,
  LARGE_WIDTH,
  MEDIUM_ORIGINAL_AMOUNT,
  MEDIUM_WIDTH,
  SMALL_EXTRA_AMOUNT,
  SMALL_ORIGINAL_AMOUNT,
} from "../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, isLiked, handleLike, handleDislike }) {
  const [width, setWidth] = useState(0); // ширина
  const [amount, setAmount] = useState(0); // счетчик
  const part = movies.slice(0, amount); // разделение, необходимое для отрисовки

  // чтобы колбэк-функция слушателя не срабатывала слишком часто, установливаем setTimeout на вызов этой функции внутри слушателя "resize"
  function screenWidthChange() {
    setTimeout(() => {
      setWidth(window.innerWidth);
    }, 500);
  }

  // при изменении ширины экрана
  useEffect(() => {
    window.addEventListener("resize", screenWidthChange);
    setWidth(window.innerWidth);
    if (width >= LARGE_WIDTH) {
      setAmount(LARGE_ORIGINAL_AMOUNT);
    } else if (width >= MEDIUM_WIDTH) {
      setAmount(MEDIUM_ORIGINAL_AMOUNT);
    } else {
      setAmount(SMALL_ORIGINAL_AMOUNT);
    }
    return () => {
      window.removeEventListener("resize", screenWidthChange);
    };
  }, [width]);

  // устанавливаем значение при нажитии на кнопку еще
  const handleMoreCards = () => {
    if (width >= LARGE_WIDTH) {
      setAmount(amount + LARGE_EXTRA_AMOUNT);
    } else if (width >= MEDIUM_WIDTH) {
      setAmount(amount + SMALL_EXTRA_AMOUNT);
    } else {
      setAmount(amount + SMALL_EXTRA_AMOUNT);
    }
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__movies">
        {part.map((movie) => (
          <MoviesCard
            key={movie._id || movie.id}
            movie={movie}
            handleLike={handleLike}
            handleDislike={handleDislike}
            isLiked={isLiked}
          />
        ))}
      </ul>
      {amount >= movies.length ? null : (
        <button
          className="movies-card-list__more-button"
          aria-label="Load more movies"
          onClick={handleMoreCards}
        >
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
