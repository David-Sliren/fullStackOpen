import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [filterValue, setfilterValue] = useState("");

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
