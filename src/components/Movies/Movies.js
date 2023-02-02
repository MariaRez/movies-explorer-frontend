import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import UserInformation from "../UserInformation/UserInformation";
import nosmile from "../../images/nosmile.png";

function Movies({
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
    <section className="movies">
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
              title={"К сожалению, под ваш запрос не удалось найти фильмы"}
              description={"Попробуйте изменить запрос"}
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

export default Movies;
