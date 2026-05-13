import { createSlice } from "@reduxjs/toolkit";
import { createNew, getAll, setMoreVotes } from "../../server/config";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push(content);
    },

    addVotes(state, action) {
      const content = action.payload;

      const valuanec = state.map((an) => (an.id === content.id ? content : an));

      return valuanec;
    },

    setAnecdote(state, action) {
      return action.payload;
    },
  },
});

const { createAnecdote, setAnecdote, addVotes } = anecdoteSlice.actions;

export const initialStore = () => {
  return async (dispatch) => {
    const AllData = await getAll();
    dispatch(setAnecdote(AllData));
  };
};

export const setNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const setNewVotes = (data) => {
  return async (dispatch, getState) => {
    const { anecdote } = getState();

    const getElement = anecdote.find((an) => an.id === data.id);

    if (!getElement) return;

    const newVote = { votes: getElement.votes + 1 };

    const moreVotes = await setMoreVotes(data.id, newVote);

    dispatch(addVotes(moreVotes));
  };
};

export default anecdoteSlice.reducer;
