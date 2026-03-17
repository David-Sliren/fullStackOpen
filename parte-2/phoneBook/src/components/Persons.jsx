import React from "react";

const Persons = ({ numberPersons }) => {
  return (
    <table>
      <tbody>
        {numberPersons.map((n) => (
          <tr key={n.id}>
            <td>{n.name}</td>
            <td>{n.tel}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Persons;
