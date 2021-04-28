import { useState } from "react";

// ********* EXMAPLE USE
// const { values, handleInputChange } = useForm({
//   description: "",
// });

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    console.log(target);
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return {
    values,
    handleInputChange,
    reset,
  };
};
