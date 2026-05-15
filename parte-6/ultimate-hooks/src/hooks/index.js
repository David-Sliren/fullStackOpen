import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };

    getAll();
  }, [baseUrl]);

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setResources((re) => [...re, response.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
