import { useDispatch } from "react-redux";
import { createAnecdote } from "../store/slices/anecdoteSlice";
import { newNotification } from "../store/slices/notificationSlice";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = e.target.text.value;
    dispatch(createAnecdote(value));
    dispatch(newNotification("you created a new anecdote"));
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
