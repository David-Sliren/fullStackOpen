import phoneService from "../services/phoneService";

const Persons = ({ numberPersons, onDelete }) => {
  return (
    <table>
      <tbody>
        {numberPersons.map((n) => (
          <tr key={n.id}>
            <td>{n.name}</td>
            <td>{n.number}</td>
            <td>
              <button onClick={() => onDelete(n.id)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Persons;
