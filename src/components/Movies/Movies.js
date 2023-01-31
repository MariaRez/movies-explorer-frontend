import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";

function Movies({
  sortingMovies,
  onSubmitSearch,
  setPreloader,
  isLoading,
  movies,
  toggleLike,
  filterStatus,
}) {
  //состояние для хранения массива коротких фильмов
  const [shortMovies, setShortMovies] = useState([]);
  //состояние чек-бокса для фильтрации
  const [isChecked, setIsChecked] = useState(false);
  // если есть чек на короткометражки, то установи массив коротких фильмов - отсортированные фильмы из App
  useEffect(() => {
    if (isChecked) {
      setShortMovies(sortingMovies(movies));
    }
  }, [isChecked]);

  return (
    <section className="movies">
      <SearchForm
        handleSearch={onSubmitSearch}
        setIsChecked={setIsChecked}
        setPreloader={setPreloader}
        isLoading={isLoading}
      />
      {isLoading && <Preloader />}
      {/* добавить результат при не найденых результатах поиска */}
      {isChecked && movies.length !== 0 && shortMovies.length === 0 && (
        <UserInformation
          image={nosmile}
          title={"Короткометражных фильмов не найдено"}
          description={
            "Переключите чекбокс и продолжайте наслаждаться фильмами"
          }
        />
      )}
      {/* если массив не ноль, то отрисовывается массив фильмов */}
      {movies.length !== 0 && (
        <MoviesCardList
          // если чекбокс нажат, то пользователь получает массив короткометраженых фильмов, если нет, то полный массив найденных
          movies={isChecked ? shortMovies : movies}
          toggleLike={toggleLike}
          filterStatus={filterStatus}
        />
      )}
    </section>
  );
}

export default Movies;
