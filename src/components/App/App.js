import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import Footer from '../Footer/Footer';
import './App.css';
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
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
        </Route>
        <Route exact path="/signin">
        </Route>
        <Route exact path="/signup">
        </Route>
        <Route path="/*">
          <PageNotFound />
        </Route>
      </Switch>
      <Footer/>
    </div>
  )
}

export default App;
