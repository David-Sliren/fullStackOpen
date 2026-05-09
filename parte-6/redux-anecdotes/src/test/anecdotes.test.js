import freeze from "deep-freeze";
import { describe, test, expect } from "vitest";
import anecdoteReducer, { initialState } from "../store/anecdoteReducer";

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
    const action = { type: "ADDVOTES", payload: { id: 2 } };

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
    const action = {
      type: "NEWANECDOTE",
      payload: { content: "The black Mamba bit me", id: 4, votes: 0 },
    };

    const anecdote = anecdoteReducer(state, action);
    freeze(state);

    expect(anecdote).toHaveLength(3);
    expect(anecdote[anecdote.length - 1]).toEqual(action.payload);
  });
});
