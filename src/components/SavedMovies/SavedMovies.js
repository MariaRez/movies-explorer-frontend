import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";
import smile from "../../images/smile.png";
import Preloader from "../Preloader/Preloader";
import {
  SHORT_MOVIES_DURATION,
  NOT_FOUND_SEARCH_MESSAGE,
} from "../../utils/constants";

function SavedMovies({ movies, isLiked, handleDislike }) {
  const [searchedMovies, setSearchedMovies] = useState([]); // массив искомых фильмов в результате поиска
  const [keyword, setKeyword] = useState(""); // ключевые слова для поиска
  const [isChecked, setIsChecked] = useState(false); // состояние чекбокса
  const [isLoading, setIsLoading] = useState(false); // загрузка
  const [isFinish, setIsFinish] = useState(false); // состояние завершения процесса поиска
  const [errorMessage, setErrorMessage] = useState(""); // ошибка над кнопками зарегистрироваться, войти и редактирование профиля

  // Функция поиска фильмов
  function search(movies, keyword, isChecked) {
    let result;
    let shortMoviesArray = movies;
    if (isChecked) {
      // функция cортировки фильмов на короткометражные - собираем массив в передаем его дальше (если продолжительность меньше или равна 40)
      shortMoviesArray = shortMoviesArray.filter(
        (movie) => movie.duration <= SHORT_MOVIES_DURATION
      );
    }
    result = shortMoviesArray.filter((movie) => {
      return (
        // на основании названия на английском и русском
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    return result;
  }
  // функция поиска по сохраненным фильмам
  function submitSearchInSavedMovies(keyword, isChecked) {
      setTimeout(() => setIsLoading(false), 2000); // для отображения
      const searchResult = search(movies, keyword, isChecked);
      setSearchedMovies(searchResult); // устанавливаем результат поиска
      setKeyword(keyword); // устанавливаем ключевые слова
      setIsChecked(isChecked); // состояние чекбокса
      setIsFinish(true); // поиск завершен
      setErrorMessage(""); // сообщение
  }

  useEffect(() => {
    if (searchedMovies.length > 0) {
      const searchResult = search(movies, keyword, isChecked);
      setSearchedMovies(searchResult); // устанавливаем результат поиска
    }
  }, [movies, keyword, isChecked, searchedMovies.length]);

  return (
    <section className="saved-movies">
      <SearchForm
        handleSearch={submitSearchInSavedMovies}
        setPreloader={setIsLoading}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      {isLoading ? (
        <Preloader />
      ) : ( 
        <>
        { movies.length === 0 ? (
          <UserInformation image={smile} title="Вы еще не добавили фильмы в избранное"/>
        ) : (
          <>
          {  isFinish && movies.length !== 0 && searchedMovies.length === 0 ? (
            <UserInformation image={nosmile} title={NOT_FOUND_SEARCH_MESSAGE}/>
          ): (
            <MoviesCardList
            movies={isFinish ? searchedMovies : movies}
            handleDislike={handleDislike}
            isLiked={isLiked}
          />
          )}
          </>
        )}
        </>
      )}
    </section>
  );
}

export default SavedMovies;
