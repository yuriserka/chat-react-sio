import { useState } from "react";

const useForm = (initialValues) => {
  const [state, setState] = useState(initialValues);

  function onChange(event) {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  return [state, onChange];
};

export default useForm;
