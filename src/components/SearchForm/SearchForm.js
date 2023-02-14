import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({
  handleSearch,
  setIsChecked,
  setPreloader,
  isLoading,
  errorMessage,
  setKeyword,
  keyword
}) {

  const submitButtonClassName = `search-form__button ${isLoading ? "search-form__button_disabled" : ""}`;
  const inputClassName = `search-form__input ${ isLoading ? "search-form__input_disabled" : ""}`
  const [isShortMovie, setIsShortMovie] = useState(false); // короткометражный фильм

  // переключаткль чек бокса
  function onCheckboxToggle(checked) {
    setIsShortMovie(checked);
    setIsChecked(!isShortMovie);
  }
  // переключатель для ключевых слов поиска
  function handleKeyword(evt) {
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
          className={inputClassName}
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Введите ключевое слово для поиска"
          value={keyword}
          onChange={handleKeyword}
          disabled={isLoading ? true : false}
        />
        <button
          className={submitButtonClassName}
          type="submit"
          disabled={isLoading ? true : false}
        >
          Поиск
        </button>
      </form>
      <span className="search-form__error" id="keywords-error">
        {errorMessage}
      </span>
      <FilterCheckbox onCheckboxToggle={onCheckboxToggle} isLoading={isLoading} />
    </div>
  );
}

export default SearchForm;