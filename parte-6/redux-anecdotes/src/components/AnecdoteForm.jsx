import { useDispatch } from "react-redux";
import { createAnecdote } from "../store/anecdoteReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.text.value;
    dispatch(createAnecdote(value));
    e.target.text.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="text" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};
