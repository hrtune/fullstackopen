import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
const UserRow = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </td>
    <td>{user.blogs.length}</td>
  </tr>
);

const Users = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <Header />
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <UserRow key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
