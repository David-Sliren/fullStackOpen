import { useDispatch, useSelector } from "react-redux";
import { addVotes } from "../store/anecdoteReducer";
import { sortListAnecdotes } from "../utils/sorts";

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
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortListAnecdotes(anecdotes).map((anecdote) => (
        <NewAnecdote
          key={anecdote.id}
          id={anecdote.id}
          content={anecdote.content}
          votes={anecdote.votes}
          handleClick={() => dispatch(addVotes(anecdote.id))}
        />
      ))}
    </div>
  );
};
