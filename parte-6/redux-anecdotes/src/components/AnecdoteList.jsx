import { useDispatch, useSelector } from "react-redux";
import { setNewVotes } from "../store/slices/anecdoteSlice";
import { sortListAnecdotes } from "../utils/sorts";
import { setNewNotidication } from "../store/slices/notificationSlice";

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

  function handlerAddVotes(id, content) {
    dispatch(setNewVotes({ id }));
    dispatch(setNewNotidication(`you just gave like to: ${content}`, 4));
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
          handleClick={() => handlerAddVotes(anecdote.id, anecdote.content)}
        />
      ))}
    </div>
  );
};
