import { useSelector } from "react-redux";
const Notification = () => {
  const { message, error } = useSelector((state) => state.notification);
  if (!message) {
    return null;
  }

  const state = error ? "error" : "success";

  return <div className={state}>{message}</div>;
};

export default Notification;
