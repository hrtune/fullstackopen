import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => dispatch(deleteNotification()), seconds * 1000);
  };
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload;
      state = notification;
      return state;
    },
    deleteNotification(state, action) {
      state = "";
      return state;
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
