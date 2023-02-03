import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";
import smile from "../../images/smile.png";

function Movies({
  sortingMovies,
  onSubmitSearch,
  setPreloader,
  isLoading,
  movies,
  isLiked,
  handleLike,
  handleDislike,
  searchResult,
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
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          {searchResult
            ? movies.length === 0 && (
                <UserInformation image={nosmile} title={searchResult} />
              )
            : movies.length === 0 && (
                <UserInformation image={smile} title={"Введите поисковый запрос"} />
              )}

          {isChecked && movies.length !== 0 && shortMovies.length === 0 && (
            <UserInformation
              image={nosmile}
              title={"Короткометражные фильмы не найдены"}
            />
          )}

          {movies.length !== 0 && (
            <MoviesCardList
              movies={isChecked ? shortMovies : movies}
              handleLike={handleLike}
              handleDislike={handleDislike}
              isLiked={isLiked}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Movies;
