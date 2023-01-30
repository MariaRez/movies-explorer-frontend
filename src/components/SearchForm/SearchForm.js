import React, { useEffect, useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import useFormWithValidation from "../../utils/useFormWithValidation";
import "./SearchForm.css";

function SearchForm({ handleSearch, setIsChecked, setPreloader, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const submitButtonClassName = `search-form__button ${
    !isValid && "search-form__button_disabled"
  }`;
  const [keyword, setKeyword] = useState(""); // ключевые слова для поиска
  const [isShortMovie, setIsShortMovie] = useState(false); // короткометражный фильм

  useEffect(() => {
    resetForm("", "", false);
  }, [resetForm]); //сброс формы

  // переключаткль чек бокса
  function onCheckboxToggle(checked) {
    setIsShortMovie(checked);
    setIsChecked(!isShortMovie);
  }
  // переключатель для ключевых слов поиска
  function handleKeyword(evt) {
    handleChange(evt); // из формы валидации берем переключатель
    setKeyword(evt.target.value); // устанавливаем значение для поля с ключевыми словами
  }
  // функция отправки - передвем слова для поиска и прелоудер на отображение
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(keyword);
    setPreloader(true); // запуск прелоудера загрузки
  }

  return (
    <div className="search-form">
      <form
        name="search-form"
        className="search-form__form"
        onSubmit={handleSubmit}
      >
        <input
          className="search-form__input"
          type="text"
          name="keyword"
          id="keyword"
          required
          placeholder="Введите ключевое слово для поиска"
          value={values.keyword || ""}
          onChange={handleKeyword}
          disabled={isLoading}
        />
        <button
          className={submitButtonClassName}
          type="submit"
          disabled={!isValid}
        >
          Поиск
        </button>
      </form>
      <span className="search-form__error" id="keywords-error">
        {errors.keyword || ""}
      </span>
      <FilterCheckbox onCheckboxToggle={onCheckboxToggle} />
    </div>
  );
}

export default SearchForm;