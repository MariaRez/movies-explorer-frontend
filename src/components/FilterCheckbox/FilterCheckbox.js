import React from 'react'
import './FilterCheckbox.css'

function FilterCheckbox () {
    return (
        <div className='filter-checkbox'>
            <input type="checkbox" id="checkbox" name="checkbox"/>
            <label htmlFor="checkbox" className="filter-checkbox__label"></label>
            <p className='filter-checkbox__text'>Короткометражки</p>
        </div>
    )
};

export default FilterCheckbox;