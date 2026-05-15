import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCountry, useField } from "./hooks";
import { Country } from "./components/Country";
import { getAll } from "./server/config";

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const country = useCountry(name);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  useEffect(() => {
    const api = async () => {
      const result = await getAll();
      setData(result);
    };
    api();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />

      {!name && (
        <div>
          {data.map((dt) => {
            return (
              <div key={dt.name.common}>
                <h3>{dt.name.common} </h3>
                <div>capital {dt.capital} </div>
                <div>population {dt.population}</div>
                <img
                  src={dt.flags.png}
                  height="100"
                  alt={`flag of ${dt.name.common}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
