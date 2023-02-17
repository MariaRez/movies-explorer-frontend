import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ handleSearch, setPreloader, isLoading, errorMessage }) {
  const submitButtonClassName = `search-form__button ${
    isLoading ? "search-form__button_disabled" : ""
  }`;
  const inputClassName = `search-form__input ${
    isLoading ? "search-form__input_disabled" : ""
  }`;

  const location = useLocation();

  const [keyword, setKeyword] = useState(""); // ключевые слова для поиска
  const [isChecked, setIsChecked] = useState(false); // состояние чекбокса

  useEffect(() => {
    if (location.pathname === "/movies") {
      const keyword = localStorage.getItem("keyword");
      const checked = localStorage.getItem("isChecked");
      if (keyword) {
        setKeyword(keyword);
      }
      if (JSON.parse(checked) === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [location.pathname]);

  function toggleCheckbox(isChecked) {
    setIsChecked(isChecked);
    handleSearch(keyword, isChecked);
  }
  // переключаткль чек бокса
  function handleCheckbox(evt) {
    toggleCheckbox(evt.target.checked);
  }
  // переключатель для ключевых слов поиска
  function handleKeyword(evt) {
    setKeyword(evt.target.value); // устанавливаем значение для поля с ключевыми словами
  }
  // функция отправки - передвем слова для поиска и прелоудер на отображение
  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(keyword, isChecked);
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
      <FilterCheckbox
        onCheckboxToggle={handleCheckbox}
        isLoading={isLoading}
        isChecked={isChecked}
      />
    </div>
  );
}

export default SearchForm;
