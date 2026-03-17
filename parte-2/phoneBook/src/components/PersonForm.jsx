import React, { useState } from "react";

const PersonForm = ({ newPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  function addNumber(e) {
    e.preventDefault();
    const newNumberPhone = {
      id: Math.floor(Math.random() * 999),
      name: newName,
      tel: newNumber,
    };

    newPersons(newNumberPhone);
    setNewName("");
    setNewNumber("");
  }

  function addNewName(e) {
    setNewName(e.target.value);
  }

  function addNewNumber(e) {
    setNewNumber(e.target.value);
  }

  return (
    <form onSubmit={addNumber}>
      <div>
        name: <input type="text" value={newName} onChange={addNewName} />
      </div>
      <div>
        number: <input type="text" value={newNumber} onChange={addNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
