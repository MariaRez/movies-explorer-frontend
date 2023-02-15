import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

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
          <MoviesCardList
          movies={movies}
          handleLike={handleLike}
          handleDislike={handleDislike}
          isLiked={isLiked}
          sortingMovies={sortingMovies}
        />
      )}
    </section>
  );
}

export default Movies;
