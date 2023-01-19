import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: undefined,
  text: "",
};

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(deleteNotification());
    dispatch(createNotification(message));
    const timeoutId = setTimeout(
      () => dispatch(deleteNotification()),
      seconds * 1000
    );
    dispatch(setTimeoutId(timeoutId));
  };
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = action.payload;
      state.text = notification;
      return state;
    },
    deleteNotification(state, action) {
      clearTimeout(state.id);
      state.text = "";
      state.id = undefined;
      return state;
    },
    setTimeoutId(state, action) {
      state.id = action.payload;
      return state;
    },
  },
});

export const { createNotification, deleteNotification, setTimeoutId } =
  notificationSlice.actions;

export default notificationSlice.reducer;
