import { ALL_AUTHORS, EDIT_BIRTH } from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import SetBirthyear from "./SetBirthyear";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  // define here in order to re-render this component
  const [editBirth] = useMutation(EDIT_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <SetBirthyear editBirth={editBirth} />
    </div>
  );
};

export default Authors;
