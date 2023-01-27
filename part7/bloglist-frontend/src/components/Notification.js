import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
const Notification = () => {
  const { message, error } = useSelector((state) => state.notification);
  if (!message) {
    return null;
  }

  const state = error ? "danger" : "success";

  return <Alert variant={state}>{message}</Alert>;
};

export default Notification;
