import { UseNotificationContext } from "../context/NotificationContext";
import { useField } from "../hooks";
import { useCreateAnecdote } from "../hooks/useQuery";

const AnecdoteForm = () => {
  const { newAnecdote } = useCreateAnecdote();
  const { setNotification } = UseNotificationContext();
  const { onChange, resetField, type, valueField } = useField("text");

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    setNotification("you created a new anecdote", 4);
    newAnecdote.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="anecdote"
          onChange={onChange}
          value={valueField}
          type={type}
        />
        <button type="submit">Create</button>
        <button type="button" onClick={resetField}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
