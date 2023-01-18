import { createSlice } from "@reduxjs/toolkit";
const initialState = "";

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
