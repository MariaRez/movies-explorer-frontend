import React from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { movies } from "../../utils/movies";

function Movies({ isLoading }) {
  return (
    <section className="movies">
      <SearchForm />
      {isLoading ? <Preloader /> : <MoviesCardList movies={movies} />}
    </section>
  );
}

export default Movies; 
