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
import { auth } from "../../utils/auth";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import success from "../../images/success.svg";
import wrong from "../../images/wrong.svg";

function App() {
  const location = useLocation(); // подвал приложения должен быть на странице о проекте, фильмы и сохраненные фильмы
  const history = useHistory(); // для перенаправления (при проверке токена)
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });

  // появление компонента с подсказкой, его изображение и текст
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [isImageForInfoTooltip, setIsImageForInfoTooltip] = useState("");
  const [isTextForInfoTooltip, setIsTextForInfoTooltip] = useState("");

  React.useEffect(() => {
    checkToken();
  }, []);

  function checkToken() {
    // дополнить залогинен и емайл
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleRegisterSubmit(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(success);
        setIsTextForInfoTooltip("Регистрация прошла успешно!");
        setTimeout(() => {
          setIsOpenInfoTooltip(false);
          history.push("/signin"); // возможно нужно будет сменить в соотвествии с тз
        }, 1000);
      })
      .catch(() => {
        setIsOpenInfoTooltip(false);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip("Упс! Что-то пошло не так!");
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        history.push("/movies");
        setIsOpenInfoTooltip(true);
        setIsImageForInfoTooltip(success);
        setIsTextForInfoTooltip("Вы вошли в свою учетную запись!");
      })
      .catch(() => {
        setIsOpenInfoTooltip(false);
        setIsImageForInfoTooltip(wrong);
        setIsTextForInfoTooltip("Упс! Что-то пошло не так!");
      });
  }

  // исчезнование компонента с подсказкой
  function closeInfoTooltip() {
    setIsOpenInfoTooltip(false);
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
          <Route exact path="/movies">
            <Movies />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
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
