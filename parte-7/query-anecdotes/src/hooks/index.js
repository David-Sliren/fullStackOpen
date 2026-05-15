import { useState } from "react";

export const useField = (type) => {
  const [valueField, setValueField] = useState("");

  const onChange = (e) => {
    setValueField(e.target.value);
  };

  const resetField = () => {
    setValueField("");
  };

  return {
    type,
    valueField,

    // methods
    onChange,
    resetField,
  };
};
