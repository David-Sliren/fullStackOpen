import { useDispatch } from "react-redux";
import { setNewAnecdote } from "../store/slices/anecdoteSlice";
import { setNewNotidication } from "../store/slices/notificationSlice";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = e.target.text.value;
    e.target.text.value = "";
    dispatch(setNewAnecdote(value));
    dispatch(setNewNotidication("you created a new anecdote", 5));
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
