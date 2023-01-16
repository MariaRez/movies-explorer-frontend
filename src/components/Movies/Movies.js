import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { movies } from "../../utils/movies";

function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList movies={movies} />
      <button className="movies__more-button">Еще</button>
    </section>
  );
}

export default Movies;
