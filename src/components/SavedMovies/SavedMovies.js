import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";
import smile from "../../images/smile.png";
import Preloader from "../Preloader/Preloader";
import {
  NOT_FOUND_SHORT_SEARCH_MESSAGE,
  START_SEARCH,
} from "../../utils/constants";

function SavedMovies({
  sortingMovies,
  onSubmitSearch,
  setPreloader,
  isLoading,
  movies,
  isLiked,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  return (
    <section className="saved-movies">
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
                <UserInformation image={smile} title={START_SEARCH} />
              )}

          {isChecked && movies.length !== 0 && shortMovies.length === 0 && (
            <UserInformation
              image={nosmile}
              title={NOT_FOUND_SHORT_SEARCH_MESSAGE}
            />
          )}

          {movies.length !== 0 && (
            <MoviesCardList
              movies={isChecked ? shortMovies : movies}
              handleDislike={handleDislike}
              isLiked={isLiked}
            />
          )}
        </>
      )}
    </section>
  );
}

export default SavedMovies;
