import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterAnedote",
  initialState: "",
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;
