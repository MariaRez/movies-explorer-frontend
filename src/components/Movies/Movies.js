import React from 'react'
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css'

function Movies () {
    return (
        <section className='movies'>
            <SearchForm />
            <Preloader />
        </section>
    )
};

export default Movies;