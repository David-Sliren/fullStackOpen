import { CreateNote } from "./components/CreateNote";
import { Note } from "./components/Note";
import { Notification } from "./components/Notification";
import { useGetAllDiaries } from "./hooks/useGet";

const App = () => {
  const { getDairies } = useGetAllDiaries();

  if (getDairies.isError) return <div children="not found" />;

  if (getDairies.isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Notification />
      <CreateNote />
      {getDairies.data?.map((e) => (
        <Note key={e.id} {...e} />
      ))}
    </div>
  );
};

export default App;
