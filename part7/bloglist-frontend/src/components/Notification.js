const Notification = ({ message, error }) => {
  if (!message) {
    return null;
  }

  const state = error ? "error" : "success";

  return <div className={state}>{message}</div>;
};

export default Notification;
