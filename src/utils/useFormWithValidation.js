import React, { useCallback } from "react";

//хук управления формой и валидации формы
function useFormWithValidation() {
    const [values, setValues] = React.useState({}); //значения переменных
    const [errors, setErrors] = React.useState({}); //ошибки
    const [isValid, setIsValid] = React.useState(false); //изначально невалиден
  
    const handleChange = (event) => {
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    };
  
    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
    );
  
    return { values, handleChange, errors, isValid, resetForm };
  }

  export default useFormWithValidation;