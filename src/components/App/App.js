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
import { auth } from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import success from "../../images/success.svg";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";

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

  useEffect(() => {
    if (loggedIn) {
      // если залогинен, то дай информацию о пользвателе и его сохраненные фильмы
      Promise.all([mainApi.getUserInfo(), mainApi.getUserMovies])
        .then(([userInfo, favoriteMovies]) => {
          // установи как текущие данные пользователя и его сохраненные фильмы
          setCurrentUser(userInfo.data);
          setIsFavoriteMovies(favoriteMovies.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    checkToken();
  }, []);
  // проверка токена
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
  // регистрация нового пользователя
  function handleRegisterSubmit(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(success);
        setIsTextForInfoTooltip(
          "Регистрация прошла успешно! Добро пожаловать!"
        );
        handleLoginSubmit(email, password);
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 1500);
      })
      .then(() => history.push("/movies"))
      .catch((err) => {
        if (err.includes(409)) {
          setErrorMessage("Пользователь с таким email уже существует");
        } else if (err.includes(500)) {
          setErrorMessage("Внутренняя ошибка сервера, попробуйте позднее.");
        } else {
          setErrorMessage(
            "Очень жаль, произошла ошибка при регистрации пользователя."
          );
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
        setIsTextForInfoTooltip("Рады снова видеть!");
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 1500);
      })
      .then(() => history.push("/movies"))
      .catch((err) => {
        if (err.includes(500)) {
          setErrorMessage("Внутренняя ошибка сервера, попробуйте позднее.");
        } else {
          setErrorMessage(
            "Очень жаль, произошла ошибка при авторизации пользователя."
          );
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
        setIsTextForInfoTooltip("Данные профиля успешно обновлены!");
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 1500);
      })
      .catch((err) => {
        if (err.includes(500)) {
          setErrorMessage("Внутренняя ошибка сервера, попробуйте позднее.");
        } else {
          setErrorMessage(
            "Очень жаль, произошла ошибка при изменении данных пользователя."
          );
        }
      });
  }
  // выход из аккаунта
  function handleExitSubmit() {
    localStorage.removeItem("token"); // удаляем токен
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
        console.log(err);
      })
  }
  // получение сохраненных фильмов
  function getFavoriteMovies() {
    mainApi
      .getUserMovies() // получаем от нашего айпи
      .then((data) => {
        setIsFavoriteMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // поиск на основании имени названия фильма и включает ли он переданные ключевые слова
  function search(data, keyword) {
    let result = data;
    if (keyword) {
      keyword = keyword.toLowerCase();
      result = data.filter(data => {
        const ru = data.nameRU.toLowerCase();
        const en = data.nameEN.toLowerCase();
        return (ru.includes(keyword) || en.includes(keyword)) 
      });
    } else {
      result = [];
    }
    return result;
  }
  // функция фортировки фильмов на короткометражные - собираем массив в передаем его дальше (если продолжительность меньше или равна 40)
  function sortingMovies(movies) {
    const shortMoviesArray = movies.filter((movie) => movie.duration <= 40);
    return shortMoviesArray;
  }
  // функция поиска
  function submitSearch(keyword) {
    getBeatMovies();
    setTimeout(() => setIsLoading(false), 2000); // для отображения
    setSearchedMovies(search(beatFilmMovies, keyword));
    console.log(searchedMovies);
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
  // функция добавления фильмов - создания их в сохраненных
  function handleMovieLike(movie) {
    mainApi
      .createMovie(movie)
      .then((res) => {
        const newSavedMovie = res.newMovie;
        setIsFavoriteMovies([...favoriteMovies, newSavedMovie]);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }
  // удаление - из сохраненных
  function handleMovieDelete(movie) {
    const movieId = favoriteMovies.find(
      (item) => item.movieId === movie.movieId
    )._id;
    mainApi
      .deleteMovie(movieId)
      .then((res) => {
        getFavoriteMovies();
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  }

  function filterStatus(movie) {
    return favoriteMovies.some(
      (savedMovie) => savedMovie.movieId === movie.movieId
    );
  }

  function toggleLike(movie, isLiked) {
    isLiked ? handleMovieDelete(movie) : handleMovieLike(movie);
  }

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
            toggleLike={toggleLike}
            filterStatus={filterStatus}
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
            toggleLike={toggleLike}
            filterStatus={filterStatus}
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
