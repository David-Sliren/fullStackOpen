import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    newNotification(state, action) {
      return action.payload;
    },
  },
});

const { newNotification } = notificationSlice.actions;

export const setNewNotidication = (message, second = 0) => {
  return (dispatch) => {
    dispatch(newNotification(message));
    setTimeout(() => {
      dispatch(newNotification(""));
    }, second * 1000);
  };
};

export default notificationSlice.reducer;
