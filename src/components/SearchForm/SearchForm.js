import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
  return (
    <div className="search-form">
      <form name="search-form" className="search-form__form">
        <input
          className="search-form__input"
          type="text"
          placeholder="Фильм"
          required
        />
        <button className="search-form__button" type="button">
          Поиск
        </button>
      </form>
      <FilterCheckbox />
    </div>
  );
}

export default SearchForm;
