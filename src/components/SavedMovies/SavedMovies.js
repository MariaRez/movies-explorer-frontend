import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { savedMovies } from "../../utils/movies";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  sortingMovies,
  onSubmitSearch,
  setPreloader,
  isLoading,
}) {
  //состояние для хранения массива коротких фильмов
  const [shortMovies, setShortMovies] = useState([]);
  //состояние чек-бокса для фильтрации
  const [isChecked, setIsChecked] = useState(false);
  // если есть чек на короткометражки, то установи массив коротких фильмов - отсортированные фильмы из App
  useEffect(() => {
    if (isChecked) {
      setShortMovies(sortingMovies(savedMovies));
    }
  }, [isChecked]);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSearch={onSubmitSearch}
        setIsChecked={setIsChecked}
        setPreloader={setPreloader}
        isLoading={isLoading}
      />
      {isLoading && <Preloader />}
      {/* добавить результат при не найденых результатах поиска */}
      {isChecked && savedMovies.length !== 0 && shortMovies.length === 0 && (
        <UserInformation
          image={nosmile}
          title={"Короткометражных фильмов не найдено"}
          description={
            "Переключите чекбокс и продолжайте наслаждаться фильмами"
          }
        />
      )}
      <MoviesCardList
        // если чекбокс нажат, то пользователь получает массив короткометраженых фильмов, если нет, то полный массив найденных
        movies={isChecked ? shortMovies : savedMovies}
      />
    </section>
  );
}

export default SavedMovies;
