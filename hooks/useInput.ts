import React, { useState } from "react";

interface InputProps {
  initialValue: string;
}

const useInput = ({ initialValue }: InputProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newVal: string) => {
    setValue(newVal);
  };

  return [value, handleChange] as const;
};

export default useInput;
