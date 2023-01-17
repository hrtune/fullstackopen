import { createSlice } from "@reduxjs/toolkit";
const initialState = "initial notification here";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload;
      state = notification;
    },
    deleteNotification(state, action) {
      state = "";
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
