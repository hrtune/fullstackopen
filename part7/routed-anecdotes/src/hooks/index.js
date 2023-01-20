import { useState } from "react";

export const useField = (name, type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearValue = () => {
    setValue("");
  };

  const field = {
    name,
    type,
    value,
    onChange,
  };

  return {
    field,
    clearValue,
  };
};
