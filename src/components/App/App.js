import React, { useState } from "react";
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
import wrong from "../../images/wrong.svg";
import { mainApi } from "../../utils/MainApi";

function App() {
  const location = useLocation(); // подвал приложения должен быть на странице о проекте, фильмы и сохраненные фильмы
  const history = useHistory(); // для перенаправления (при проверке токена)

  const [loggedIn, setLoggedIn] = useState(false); // залогинен ли пользователь
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  // появление компонента с подсказкой, его изображение и текст
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [isImageForInfoTooltip, setIsImageForInfoTooltip] = useState("");
  const [isTextForInfoTooltip, setIsTextForInfoTooltip] = useState("");

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo()])
        .then(([userInfo]) => {
          setCurrentUser(userInfo.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    checkToken();
  }, []);

  // проверка токена
  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          history.push("/movies");
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
        setIsTextForInfoTooltip("Регистрация прошла успешно! Добро пожаловать!");
        handleLoginSubmit(email, password);
        setLoggedIn(true); // пользователь залогинен - доступны защищенные роуты
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
        }, 1500);
      })
      .then(() => history.push("/movies"))
      .catch(() => {
        // скорректировать - появление ошибки выше кнопки зарегистироваться
        setIsOpenInfoTooltip(false);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip("Упс! Что-то пошло не так!");
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
      .catch(() => {
        // скорректировать - появление ошибки выше кнопки зарегистироваться
        setIsOpenInfoTooltip(false);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip("Упс! Что-то пошло не так!");
      });
  }
  // выход из аккаунта
  function handleExitSubmit() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/");
  }

  // исчезнование компонента с подсказкой
  function closeInfoTooltip() {
    setIsOpenInfoTooltip(false);
  }

  // редактирование профиля (имя и почта)
  function handleUpdateUser(data) {
    mainApi
      .editProfile(data)
      .then((userData) => {
        setCurrentUser(userData.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          />
          <ProtectedRoute 
            exact
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
          />
          <ProtectedRoute 
            exact
            path="/profile"
            onUpdateUser={handleUpdateUser}
            handleExit={handleExitSubmit}
            loggedIn={loggedIn}
            component={Profile}
          />
          <Route exact path="/signin">
            <Login handleLogin={handleLoginSubmit} />
          </Route>
          <Route exact path="/signup">
            <Register handleRegister={handleRegisterSubmit} />
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
