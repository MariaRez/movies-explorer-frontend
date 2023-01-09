import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import './App.css';
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {

  const location = useLocation(); // подвал приложения должен быть на странице о проекте, фильмы и сохраненные фильмы

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/movies">
        </Route>
        <Route exact path="/saved-movies">
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/signin">
          <Login/>
        </Route>
        <Route exact path="/signup">
          <Register/>
        </Route>
        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
      {location.pathname === "/" || location.pathname === "/movies" || location.pathname === "/saved-movies" ? <Footer /> : ''}
    </div>
  )
}

export default App;
