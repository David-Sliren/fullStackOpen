import freeze from "deep-freeze";
import { describe, test, expect } from "vitest";
import anecdoteReducer, {
  initialState,
  createAnecdote,
  addVotes,
} from "../store/slices/anecdoteSlice";

import filterAncedotesReducer, {
  filterAnecdotes,
} from "../store/slices/filterAncedotesSlice";
import notificationReducer, {
  newNotification,
} from "../store/slices/notificationSlice";

describe("test the reducer of redux", () => {
  const initialAnect = [
    {
      id: 2,
      content: "If it hurts, do it more often",
      votes: 12,
    },

    {
      id: 4,
      content: "The black mamba",
      votes: 14,
    },
  ];

  test("return the initial value", () => {
    const action = { type: "SOMETING" };

    const anecdote = anecdoteReducer(undefined, action);

    expect(anecdote).toEqual(initialState);
  });

  test("can add votes", () => {
    const state = initialAnect;
    const action = addVotes({ id: 2 });

    const anecdote = anecdoteReducer(state, action);

    freeze(state);
    expect(anecdote[0]).toEqual({
      id: 2,
      content: "If it hurts, do it more often",
      votes: 13,
    });
  });

  test("can add new anecdote", () => {
    const state = initialAnect;
    const action = createAnecdote("pensare en ti");

    freeze(state);
    const anecdote = anecdoteReducer(state, action);

    expect(anecdote).toHaveLength(3);
    expect(anecdote[anecdote.length - 1].content).toEqual(action.payload);
  });

  test("can filter state", () => {
    const state = "hola";
    const action = filterAnecdotes("paracetamol");

    freeze(state);
    const filter = filterAncedotesReducer(state, action);

    expect(filter).toEqual(action.payload);
  });

  test("can send notification", () => {
    const state = "";
    const action = newNotification("new notification");
    freeze(state);
    const notification = notificationReducer(state, action);

    expect(notification).toEqual(action.payload);
  });
});
