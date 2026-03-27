import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect } from "react";
import phoneService from "./services/phoneService";
import "./index.css";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterValue, setfilterValue] = useState("");
  const [mesagge, setMessage] = useState({ text: "", isError: false });
  useEffect(() => {
    phoneService.getAll().then((data) => setPersons(data));
  }, []);

  const filterPersons = filterValue
    ? persons.filter((np) =>
        np.name.toLowerCase().startsWith(filterValue.toLocaleLowerCase()),
      )
    : persons;

  // ------------------------------------

  function AddNewPhone(data) {
    const searchCoincidence = persons.find(
      (person) => person.name === data.name,
    );

    if (searchCoincidence) {
      const wantUpdate = window.confirm(
        `${data.name} is already added to phonebook, replace the old number with a new one?`,
      );
      if (wantUpdate) {
        phoneService.update(searchCoincidence.id, data).then((newData) => {
          const newPhone = persons.map((person) =>
            person.id === newData.id ? newData : person,
          );
          setPersons(newPhone);
        });

        setMessage({ text: `has been update ${data.name}`, isError: false });

        setTimeout(
          () =>
            setMessage({
              text: "",
              isError: false,
            }),
          4000,
        );
      }
      return;
    }

    phoneService
      .create(data)
      .then((newData) => {
        setPersons([...persons, newData]);

        setMessage({ text: `has been added ${data.name}`, isError: false });
      })
      .catch((error) =>
        setMessage({ text: error.response.data.error, isError: true }),
      );

    setTimeout(() => setMessage({ text: "", isError: null }), 4000);
  }

  function handleDeleted(id) {
    const { name: personName } = persons.find((person) => person.id === id);
    const wantDelete = window.confirm(`You want delete to ${personName}`);

    if (wantDelete) {
      phoneService.remove(id);
      const filterData = persons.filter((person) => person.id !== id);
      setPersons(filterData);
    }
  }

  return (
    <div>
      <Notification mesaage={mesagge.text} isError={mesagge.isError} />
      <h2>Phonebook</h2>
      <Filter numberPersons={persons} onAction={setfilterValue} />

      <h3>Add a new</h3>
      <PersonForm newPersons={AddNewPhone} />

      <h3>Numbers</h3>
      <Persons numberPersons={filterPersons} onDelete={handleDeleted} />
    </div>
  );
};

export default App;
