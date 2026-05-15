import { useEffect, useState } from "react";
import { getAll, getCountry } from "../server/config";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) return;
    const find = async () => {
      const result = await getCountry(name);
      setCountry(result);
    };

    find();
  }, [name]);

  return country;
};
