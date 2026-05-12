import { configureStore } from "@reduxjs/toolkit";

import anecdoteReducer from "./slices/anecdoteSlice";
import filterAncedotesReducer from "./slices/filterAncedotesSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    anecdote: anecdoteReducer,
    filter: filterAncedotesReducer,
    notification: notificationReducer,
  },
});
