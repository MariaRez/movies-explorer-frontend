import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";
import Preloader from "../Preloader/Preloader";

function SavedMovies({
  sortingMovies,
  onSubmitSearch,
  setPreloader,
  isLoading,
  movies,
  isLiked,
  handleLike,
  handleDislike
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
          {/* если массив найденых фильмов равен 0 */}
          {!isChecked && movies.length === 0 ? (
            <UserInformation
              image={nosmile}
              title={"К сожалению вы не сохранили еще фильмы или же под ваш запрос нет подходящих"}
              description={"Вернитесь на страницу с фильмами и лайкните понравившиеся - они появятся здесь!"}
            />
          ) : (
            <>
              {/* если среди найденых фильмов нет короткометраженых */}
              {isChecked && movies.length !== 0 && shortMovies.length === 0 ? (
                <UserInformation
                  image={nosmile}
                  title={"Короткометражные фильмы не найдены"}
                  description={
                    "Переключите обратно чек-бокс и продолжайте наслаждаться фильмами"
                  }
                />
              ) : (
                <>
                  {/* если не найдены фильмы и нажать на кнопку короткометраженых */}
                  {isChecked &&
                  movies.length === 0 &&
                  shortMovies.length === 0 ? (
                    <UserInformation
                      image={nosmile}
                      title={
                        "Мы не можем найти короткометражные фильмы, если под основной запрос фильмы были не найдены"
                      }
                      description={
                        "Очень жаль! Переключите обратно чек-бокс и уточните поисковый запрос"
                      }
                    />
                  ) : (
                    <MoviesCardList
                      // если чекбокс нажат, то пользователь получает массив короткометраженых фильмов, если нет, то полный массив найденных
                      movies={isChecked ? shortMovies : movies}
                      handleLike={handleLike}
                      handleDislike={handleDislike}
                      isLiked={isLiked}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </section>
  );
}

export default SavedMovies;
