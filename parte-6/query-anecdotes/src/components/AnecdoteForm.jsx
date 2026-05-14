import { UseNotificationContext } from "../context/NotificationContext";
import { useCreateAnecdote } from "../hooks/useQuery";

const AnecdoteForm = () => {
  const { newAnecdote } = useCreateAnecdote();
  const { setNotification } = UseNotificationContext();
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
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
