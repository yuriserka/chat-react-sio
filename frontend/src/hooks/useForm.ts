import { ChangeEvent, useState } from "react";

const useForm = (initialValues: any) => {
  const [state, setState] = useState(initialValues);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  return [state, onChange];
};

export default useForm;
