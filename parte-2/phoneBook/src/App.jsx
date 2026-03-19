import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filterValue, setfilterValue] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("http://localhost:3001/persons");
        const data = await res.data;
        setPersons(data);
      } catch (error) {
        console.error(`This is : ${error}`);
      }
    }

    getData();
  }, []);

  const filterPersons = filterValue
    ? persons.filter((np) =>
        np.name.toLowerCase().startsWith(filterValue.toLocaleLowerCase()),
      )
    : persons;

  function AddNewPhone(data) {
    const newPhone = persons.concat(data);
    setPersons(newPhone);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter numberPersons={persons} onAction={setfilterValue} />

      <h3>Add a new</h3>
      <PersonForm newPersons={AddNewPhone} />

      <h3>Numbers</h3>
      <Persons numberPersons={filterPersons} />
    </div>
  );
};

export default App;
