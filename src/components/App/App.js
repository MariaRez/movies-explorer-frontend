import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
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
  CONFLICT_MESSAGE_LIKE,
  DEFAULT_MESSAGE_LOGIN,
  DEFAULT_MESSAGE_REGISTER,
  DEFAULT_MESSAGE_UPDATE,
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
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")) ? true : false
  );
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
  const [keyword, setKeyword] = useState(""); // ключевые слова для поиска
  const [isChecked, setIsChecked] = useState(false); // состояние чекбокса
  const [searchResult, setSearchResult] = useState(""); // результат поиска
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
          setLoggedIn(true);
        })
        .catch(() => {
          handleExitSubmit();
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
          setIsOpenInfoTooltip(true);
          setIsImageForInfoTooltip(wrong);
          setIsTextForInfoTooltip(err);
          setTimeout(() => {
            setIsOpenInfoTooltip(false);
          }, 2000);
        });
    }
  }, [loggedIn]);
  // регистрация нового пользователя
  function handleRegisterSubmit(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then(() => {
        setIsLoading(false);
        handleLoginSubmit(email, password);
        setErrorMessage("");
      })
      .then(() => history.push("/movies"))
      .catch((err) => {
        if (err.includes(CONFLICT_ERROR)) {
          setIsLoading(false);
          setErrorMessage(CONFLICT_MESSAGE);
        } else if (err.includes(INTERNAL_SERVER_ERROR)) {
          setErrorMessage(INTERNAL_SERVER_MESSAGE);
          setIsLoading(false);
        } else {
          setErrorMessage(DEFAULT_MESSAGE_REGISTER);
          setIsLoading(false);
        }
      });
  }
  // вход в аккаунт пользователя
  function handleLoginSubmit(email, password) {
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        setIsLoading(false);
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
          setIsLoading(false);
        } else {
          setErrorMessage(DEFAULT_MESSAGE_LOGIN);
          setIsLoading(false);
        }
      });
  }
  // редактирование профиля (имя и почта)
  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .editProfile(data)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(success);
        setIsTextForInfoTooltip(SUCCESSFUL_UPDATE_MESSAGE);
        setErrorMessage("");
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
          setIsLoading(false);
        }, 1500);
      })
      .catch((err) => {
        if (err.includes(INTERNAL_SERVER_ERROR)) {
          setErrorMessage(INTERNAL_SERVER_MESSAGE);
          setIsLoading(false);
        } else {
          setErrorMessage(DEFAULT_MESSAGE_UPDATE);
          setIsLoading(false);
        }
      });
  }
  // исчезнование компонента с подсказкой
  function closeInfoTooltip() {
    setIsOpenInfoTooltip(false);
  }
  // выход из аккаунта
  function handleExitSubmit() {
    localStorage.removeItem("token"); // удаляем токен
    localStorage.removeItem("searchedMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("keyword");
    localStorage.removeItem("isChecked");
    setBeatFilmMovies([]); // нет массива фильмов со стороннего ресурса
    setIsFavoriteMovies([]); // нет массива любимых фильмов
    setSearchedMovies([]); // нет найдены фильмов
    setKeyword(""); // нет ключевых слов
    setErrorMessage(""); // нет ошибки при регистрации и тд
    setLoggedIn(false); // не залогинен
    setSearchResult(""); // не результатов поиска
    setCurrentUser({});
    history.push("/"); // отправляем на главную страницу
  }
  useEffect(() => {
    checkLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, isChecked]);
  // проверка хранилища на наличие поискового запроса
  function checkLocalStorage() {
    const result = localStorage.getItem("searchedMovies");
    if (result) {
      const movies = JSON.parse(localStorage.getItem("searchedMovies"));
      const result = search(movies, keyword, isChecked);
      localStorage.setItem("searchedMovies", JSON.stringify(result));
      setSearchedMovies(result);
    }
  }
  // для сохранения поискового состояния
  useEffect(() => {
    if (beatFilmMovies.length > 0) {
      const movies = search(beatFilmMovies, keyword, isChecked);
      localStorage.setItem("searchedMovies", JSON.stringify(movies));
      localStorage.setItem("keyword", keyword);
      localStorage.setItem("isChecked", isChecked);
      setSearchedMovies(movies);
    }
  }, [beatFilmMovies, keyword, isChecked]);

  //функция поиска по фильмам
  function submitSearch(keyword, isChecked) {
    setTimeout(() => setIsLoading(false), 2000); // для отображения
    setErrorMessage("");
    setKeyword(keyword);
    setIsChecked(isChecked);
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (!movies) {
      setIsLoading(true);
      getBeatMovies();
    } else {
      setBeatFilmMovies(movies);
    }
  }
  // получение фильмов со стороннего ресурса
  function getBeatMovies() {
    setIsLoading(true); // загрузка
    moviesApi // получаем от стороннего реусерса фильмы
      .getBeatfilmMovies()
      .then((data) => {
        localStorage.setItem("movies", JSON.stringify(data));
        setBeatFilmMovies(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip(err);
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 2000);
      });
  }
  // Функция поиска фильмов
  function search(movies, keyword, isChecked) {
    let result;
    let shortMoviesArray = movies;
    if (isChecked) {
      // функция cортировки фильмов на короткометражные - собираем массив в передаем его дальше (если продолжительность меньше или равна 40)
      shortMoviesArray = shortMoviesArray.filter(
        (movie) => movie.duration <= SHORT_MOVIES_DURATION
      );
    }
    result = shortMoviesArray.filter((movie) => {
      return (
        // на основании названия на английском и русском
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    if (result.length === 0) {
      setSearchResult(NOT_FOUND_SEARCH_MESSAGE);
    }
    return result;
  }
  // функция сохранения фильма в сохраненные
  const handleLikeClick = (movie) => {
    const like = favoriteMovies.some((i) => i.movieId === movie.id);
    if (!like) {
      mainApi
        .createMovie(movie)
        .then((res) => {
          setIsFavoriteMovies((movies) => [...movies, res.data]);
        })
        .catch((err) => {
          if (err.includes(CONFLICT_ERROR)) {
            handleExitSubmit();
            setIsOpenInfoTooltip(true);
            setIsImageForInfoTooltip(wrong);
            setIsTextForInfoTooltip(CONFLICT_MESSAGE_LIKE);
            setTimeout(() => {
              setIsOpenInfoTooltip(false);
            }, 2000);
          } else {
            setIsOpenInfoTooltip(true);
            setIsImageForInfoTooltip(wrong);
            setIsTextForInfoTooltip(INTERNAL_SERVER_MESSAGE);
            setTimeout(() => {
              setIsOpenInfoTooltip(false);
            }, 2000);
          }
        });
    } else {
      const dislike = favoriteMovies.find((i) => i.movieId === movie.id);
      handleDislikeClick(dislike);
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
      .catch(() => {
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip(INTERNAL_SERVER_MESSAGE);
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 2000);
      });
  }
  // лайкнут ли данным пользователь фильм?
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
          <Header loggedIn={loggedIn} />
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
            handleSearch={submitSearch}
            isLoading={isLoading}
            movies={searchedMovies}
            handleLike={handleLikeClick}
            handleDislike={handleDislikeClick}
            isLiked={isLiked}
            errorMessage={errorMessage}
            setPreloader={setIsLoading}
            searchResult={searchResult}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={favoriteMovies}
            isLiked={isLiked}
            handleDislike={handleDislikeClick}
          />
          <ProtectedRoute
            exact
            path="/profile"
            onUpdateUser={handleUpdateUser}
            handleExit={handleExitSubmit}
            loggedIn={loggedIn}
            component={Profile}
            errorMessage={errorMessage}
            isLoading={isLoading}
          />
          <Route exact path="/signin">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login
                handleLogin={handleLoginSubmit}
                errorMessage={errorMessage}
                isLoading={isLoading}
              />
            )}
          </Route>
          <Route exact path="/signup">
            {loggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                handleRegister={handleRegisterSubmit}
                errorMessage={errorMessage}
                isLoading={isLoading}
              />
            )}
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
