import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";
import smile from "../../images/smile.png";
import "./Movies.css";
import { START_SEARCH } from "../../utils/constants";

function Movies({
  handleSearch,
  isLoading,
  setPreloader,
  errorMessage,
  isChecked,
  onCheckboxToggle,
  movies,
  handleLike,
  handleDislike,
  isLiked,
  sortingMovies,
  searchResult,
}) {
  return (
    <section className="movies">
      <SearchForm
        onCheckboxToggle={onCheckboxToggle}
        isLoading={isLoading}
        isChecked={isChecked}
        setPreloader={setPreloader}
        errorMessage={errorMessage}
        handleSearch={handleSearch}
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

          {movies.length !== 0 && (
            <MoviesCardList
              movies={movies}
              handleLike={handleLike}
              handleDislike={handleDislike}
              isLiked={isLiked}
              sortingMovies={sortingMovies}
            />
          )}
        </>
      )}
    </section>
  );
}

export default Movies;
