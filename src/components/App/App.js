import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import "./App.css";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import success from "../../images/success.svg";
import wrong from "../../images/wrong.svg";

import { auth } from "../../utils/auth";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import {
  CONFLICT_ERROR,
  CONFLICT_MESSAGE,
  DEFAULT_MESSAGE_LOGIN,
  DEFAULT_MESSAGE_REGISTER,
  DEFAULT_MESSAGE_UPDATE,
  FAILED_SEARCH_MESSAGE,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_MESSAGE,
  NOT_FOUND_SEARCH_MESSAGE,
  SHORT_MOVIES_DURATION,
  SUCCESSFUL_UPDATE_MESSAGE,
  WELCOME_MESSAGE,
} from "../../utils/constants";

function App() {
  const location = useLocation(); // подвал приложения должен быть на странице о проекте, фильмы и сохраненные фильмы
  const history = useHistory(); // для перенаправления (при проверке токена)
  const [loggedIn, setLoggedIn] = useState(false); // залогинен ли пользователь
  const [currentUser, setCurrentUser] = useState({}); // текущий пользователь
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false); // появление компонента с подсказкой
  const [isImageForInfoTooltip, setIsImageForInfoTooltip] = useState(""); // изображение для попапа
  const [isTextForInfoTooltip, setIsTextForInfoTooltip] = useState(""); // текст для попапа
  const [errorMessage, setErrorMessage] = useState(""); // ошибка над кнопками зарегистрироваться, войти и редактирование профиля
  const [isLoading, setIsLoading] = useState(false); // загрузка
  //блок с фильмами
  const [beatFilmMovies, setBeatFilmMovies] = useState([]); // массив фильмов, полученных со стороннего ресурса
  const [searchedMovies, setSearchedMovies] = useState([]); // массив искомых фильмов в результате поиска
  const [favoriteMovies, setIsFavoriteMovies] = useState([]); // массив сохраненных фильмов пользователя
  const [searchResult, setSearchResult] = useState(""); // результат поиска

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkToken() {
    const token = localStorage.getItem("token");
    const path = location.pathname; // в какой локации мы находились
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          history.push(path); //туда и отправляет
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies()])
        .then(([userInfo, favoriteMovies]) => {
          setCurrentUser(userInfo.data);
          setIsFavoriteMovies(favoriteMovies.data);
        })
        .catch((err) => {
          setSearchResult(FAILED_SEARCH_MESSAGE);
          setIsOpenInfoTooltip(true);
          setIsImageForInfoTooltip(wrong);
          setIsTextForInfoTooltip(err);
          setTimeout(() => {
            setIsOpenInfoTooltip(false);
          }, 2000);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (movies) {
      setBeatFilmMovies(movies);
      const searchResult = JSON.parse(localStorage.getItem("searchResult"));
      if (searchResult) {
        setSearchedMovies(searchResult);
      }
    } else {
      getBeatMovies();
    }
  }, [loggedIn]);

  // регистрация нового пользователя
  function handleRegisterSubmit(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        handleLoginSubmit(email, password);
      })
      .then(() => history.push("/movies"))
      .catch((err) => {
        if (err.includes(CONFLICT_ERROR)) {
          setErrorMessage(CONFLICT_MESSAGE);
        } else if (err.includes(INTERNAL_SERVER_ERROR)) {
          setErrorMessage(INTERNAL_SERVER_MESSAGE);
        } else {
          setErrorMessage(DEFAULT_MESSAGE_REGISTER);
        }
      });
  }
  // вход в аккаунт пользователя
  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        setLoggedIn(true);
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(success);
        setIsTextForInfoTooltip(WELCOME_MESSAGE);
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 2000);
      })
      .then(() => history.push("/movies"))
      .catch((err) => {
        if (err.includes(INTERNAL_SERVER_ERROR)) {
          setErrorMessage(INTERNAL_SERVER_MESSAGE);
        } else {
          setErrorMessage(DEFAULT_MESSAGE_LOGIN);
        }
      });
  }
  // редактирование профиля (имя и почта)
  function handleUpdateUser(data) {
    mainApi
      .editProfile(data)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(success);
        setIsTextForInfoTooltip(SUCCESSFUL_UPDATE_MESSAGE);
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 1500);
      })
      .catch((err) => {
        if (err.includes(INTERNAL_SERVER_ERROR)) {
          setErrorMessage(INTERNAL_SERVER_MESSAGE);
        } else {
          setErrorMessage(DEFAULT_MESSAGE_UPDATE);
        }
      });
  }
  // выход из аккаунта
  function handleExitSubmit() {
    localStorage.removeItem("token"); // удаляем токен
     localStorage.removeItem("searchResult");
     localStorage.removeItem("movies");
     setBeatFilmMovies([]); // нет массива фильмов со стороннего ресурса
     setIsFavoriteMovies([]); // нет массива любимых фильмов
     setSearchedMovies([]); // нет найдены фильмов
     setSearchResult(""); // нет поискового результата
     setLoggedIn(false); // не залогинен
     history.push("/"); // отправляем на главную страницу
     setCurrentUser({});
  }
  // исчезнование компонента с подсказкой
  function closeInfoTooltip() {
    setIsOpenInfoTooltip(false);
  }
  // получение фильмов со стороннего ресурса
  function getBeatMovies() {
    setIsLoading(true); // загрузка
    moviesApi // получаем от стороннего реусерса фильмы
      .getBeatfilmMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        setIsLoading(false);
      })
      .catch((err) => {
        setSearchResult(FAILED_SEARCH_MESSAGE);
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip(err);
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 1500);
      });
  }
  // поиск на основании имени названия фильма и включает ли он переданные ключевые слова
  function search(data, keyword) {
    let result = data;
    if (keyword) {
      keyword = keyword.toLowerCase();
      result = data.filter((data) => {
        return (
          data.nameRU.toLowerCase().includes(keyword) ||
          data.nameEN.toLowerCase().includes(keyword)
        );
      });
      if (result.length === 0) {
        setSearchResult(NOT_FOUND_SEARCH_MESSAGE);
      }
    }
    return result;
  }
  // функция фортировки фильмов на короткометражные - собираем массив в передаем его дальше (если продолжительность меньше или равна 40)
  function sortingMovies(movies) {
    const shortMoviesArray = movies.filter(
      (movie) => movie.duration <= SHORT_MOVIES_DURATION
    );
    return shortMoviesArray;
  }
  // функция поиска
  function submitSearch(keyword) {
    getBeatMovies();
    setTimeout(() => setIsLoading(false), 2000); // для отображения
    setSearchedMovies(search(beatFilmMovies, keyword));
    localStorage.setItem(
      "searchResult",
      JSON.stringify(search(beatFilmMovies, keyword))
    );
  }
  // функция поиска по сохраненным фильмам
  function submitSearchInSavedMovies(keyword) {
    setTimeout(() => setIsLoading(false), 2000); // для отображения
    setIsFavoriteMovies(search(favoriteMovies, keyword));
  }

  // функция сохранения фильма в сохраненные
  const handleLikeClick = (movie) => {
    const like = favoriteMovies.some((i) => i.movieId === movie.id);
    if (!like) {
      mainApi
        .createMovie(movie)
        .then((res) => {
          setIsFavoriteMovies(movies => [...movies, res.data])
        })
        .catch((err) => {
          setIsOpenInfoTooltip(true);
          setIsImageForInfoTooltip(wrong);
          setIsTextForInfoTooltip(INTERNAL_SERVER_MESSAGE);
        });
    }
  };

  // функция удаления фильма из сохраненных
  function handleDislikeClick(movie) {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setIsFavoriteMovies(
          favoriteMovies.filter((data) => data._id !== movie._id)
        );
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip(INTERNAL_SERVER_MESSAGE);
      });
  }

  const isLiked = (data) => {
    return favoriteMovies.some(
      (i) => i.movieId === data.id && i.owner === currentUser?._id
    );
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ||
        location.pathname === "/profile" ? (
          <Header />
        ) : (
          ""
        )}
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            sortingMovies={sortingMovies}
            onSubmitSearch={submitSearch}
            setPreloader={setIsLoading}
            isLoading={isLoading}
            movies={searchedMovies}
            handleLike={handleLikeClick}
            handleDislike={handleDislikeClick}
            isLiked={isLiked}
            searchResult={searchResult}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            sortingMovies={sortingMovies}
            onSubmitSearch={submitSearchInSavedMovies}
            setPreloader={setIsLoading}
            isLoading={isLoading}
            movies={favoriteMovies}
            handleLike={handleLikeClick}
            handleDislike={handleDislikeClick}
            isLiked={isLiked}
            searchResult={searchResult}
          />
          <ProtectedRoute
            exact
            path="/profile"
            onUpdateUser={handleUpdateUser}
            handleExit={handleExitSubmit}
            loggedIn={loggedIn}
            component={Profile}
            errorMessage={errorMessage}
          />
          <Route exact path="/signin">
            <Login
              handleLogin={handleLoginSubmit}
              errorMessage={errorMessage}
            />
          </Route>
          <Route exact path="/signup">
            <Register
              handleRegister={handleRegisterSubmit}
              errorMessage={errorMessage}
            />
          </Route>
          <Route path="/*">
            <PageNotFound />
          </Route>
        </Switch>
        {location.pathname === "/" ||
        location.pathname === "/movies" ||
        location.pathname === "/saved-movies" ? (
          <Footer />
        ) : (
          ""
        )}
        <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeInfoTooltip}
          image={isImageForInfoTooltip}
          text={isTextForInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
