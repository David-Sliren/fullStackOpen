import { useDispatch } from "react-redux";
import { filterAnecdotes } from "../store/slices/filterAncedotesSlice";

const FilterAnecdote = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const data = event.target.value;
    dispatch(filterAnecdotes(data.trim()));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <h3>Filtrar</h3>
      <div>
        filter <input onChange={handleChange} />
      </div>
    </div>
  );
};

export default FilterAnecdote;
