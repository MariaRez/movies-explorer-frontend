import React, { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ onCheckboxToggle, isLoading }) {
  // состояние фильтра чекбокса
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(evt) {
    //изменение на противоположное состояние при переключении флажка
    onCheckboxToggle(!isChecked);
    setIsChecked(evt.target.checked);
  }

  return (
    <div className="filter-checkbox">
      <input
        type="checkbox"
        id="checkbox"
        name="checkbox"
        disabled={isLoading ? true : false}
        checked={isChecked}
        onChange={(evt) => handleChange(evt)}
      />
      <label htmlFor="checkbox" className="filter-checkbox__label"></label>
      <p className="filter-checkbox__text">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;
