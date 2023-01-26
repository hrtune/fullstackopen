import { useSelector } from "react-redux";
import Header from "./Header";
const UserRow = ({ user }) => (
  <tr>
    <td>{user.name}</td>
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
