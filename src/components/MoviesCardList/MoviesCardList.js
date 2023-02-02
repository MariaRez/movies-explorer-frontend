import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ movies, isLiked, handleLike, handleDislike }) {

  const [width, setWidth] = useState(0);   // ширина
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
    if (width >= 1280) {
      setAmount(12);
    } else if (width >= 768) {
      setAmount(8);
    } else {
      setAmount(5);
    }
    return () => {
      window.removeEventListener("resize", screenWidthChange);
    };
  }, [width]);

  // устанавливаем значение при нажитии на кнопку еще
  const handleMoreCards = () => {
    if (width >= 1280) {
     setAmount(amount + 3);
   } else if (width >= 768) {
     setAmount(amount + 2);
   } else {
     setAmount(amount + 2);
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
          onClick={handleMoreCards}>
          Еще
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
