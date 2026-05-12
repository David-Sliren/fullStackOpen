import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import FilterAnecdote from "./components/FilterAnecdotes";
import { Notification } from "./components/Notification";

const App = () => {
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
