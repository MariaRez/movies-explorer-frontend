import React from "react";
import './PageNotFound.css';

function PageNotFound() {
    return (
        <section className="page-not-found">
            <h1 className="page-not-found__title">404</h1>
            <p className="page-not-found__subtitle">Страница не найдена</p>
            <button
                    aria-label="Back"
                    type="button"
                    className="page-not-found__button">Назад</button>
        </section>
    )
  }
  
  export default PageNotFound;