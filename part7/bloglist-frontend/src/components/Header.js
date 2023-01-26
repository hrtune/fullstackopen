import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/loginReducer";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={() => dispatch(logout())}>logout</button>
      </p>
    </div>
  );
};

export default Header;
