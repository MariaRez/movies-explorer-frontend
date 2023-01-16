import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import { savedMovies } from "../../utils/movies";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList movies={savedMovies} />
    </section>
  );
}

export default SavedMovies;
