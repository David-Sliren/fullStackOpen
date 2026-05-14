import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { UseNotificationContext } from "./context/NotificationContext";
import { useAddVotes, useGetAnecdote } from "./hooks/useQuery";

const App = () => {
  const { result } = useGetAnecdote();
  const { addVotes } = useAddVotes();
  const { setNotification } = UseNotificationContext();

  function handleVotes(id, content) {
    setNotification(`you just voted for: ${content}`, 4);
    addVotes.mutate(id);
  }

  if (result.isFetching) return <h2>Loading...</h2>;

  if (result.isError) return <h2>{result.error.message}</h2>;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVotes(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
