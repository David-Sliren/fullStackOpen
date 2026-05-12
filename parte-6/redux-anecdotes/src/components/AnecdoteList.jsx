import { useDispatch, useSelector } from "react-redux";
import { addVotes } from "../store/slices/anecdoteSlice";
import { sortListAnecdotes } from "../utils/sorts";
import { newNotification } from "../store/slices/notificationSlice";

const NewAnecdote = ({ id, content, votes, handleClick }) => {
  return (
    <li key={id}>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </li>
  );
};

export const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdote }) => {
    return filter
      ? anecdote.filter((an) =>
          an.content.toLowerCase().includes(filter.toLowerCase()),
        )
      : anecdote;
  });

  function handlerAddVotes(id) {
    dispatch(addVotes({ id }));
    dispatch(newNotification("you just gave like"));
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortListAnecdotes([...anecdotes]).map((anecdote) => (
        <NewAnecdote
          key={anecdote.id}
          id={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => handlerAddVotes(anecdote.id)}
        />
      ))}
    </div>
  );
};
