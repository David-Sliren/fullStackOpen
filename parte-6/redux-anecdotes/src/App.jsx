import { useEffect } from "react";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdotes";
import { Notification } from "./components/Notification";
import { useDispatch } from "react-redux";
import { initialStore } from "./store/slices/anecdoteSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initialStore());
  }, [dispatch]);

  return (
    <div>
      <FilterAnecdote />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
