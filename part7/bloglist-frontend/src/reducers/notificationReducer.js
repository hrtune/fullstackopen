import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: undefined,
  message: "",
  error: false,
};

export const setNotification = (message, seconds, error = false) => {
  return (dispatch) => {
    dispatch(deleteNotification());
    if (error) {
      dispatch(createErrorNotification(message));
    } else {
      dispatch(createSuccessNotification(message));
    }
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
    createErrorNotification(state, action) {
      const notification = action.payload;
      state.message = notification;
      state.error = true;
      return state;
    },
    createSuccessNotification(state, action) {
      const notification = action.payload;
      state.message = notification;
      state.error = false;
      return state;
    },
    deleteNotification(state, action) {
      clearTimeout(state.id);
      state.message = "";
      state.id = undefined;
      state.error = false;
      return state;
    },
    setTimeoutId(state, action) {
      state.id = action.payload;
      return state;
    },
  },
});

const {
  createSuccessNotification,
  createErrorNotification,
  deleteNotification,
  setTimeoutId,
} = notificationSlice.actions;

export default notificationSlice.reducer;
