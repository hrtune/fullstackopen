import { useState } from "react";

const SetBirthyear = ({ authors, editBirth }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!name || !born) {
      return null;
    }
    editBirth({
      variables: {
        name,
        setBornTo: Number(born),
      },
    });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label htmlFor="name">name</label>
        <select
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">-- select author --</option>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="born">born</label>
        <input
          type="number"
          name="born"
          value={born}
          onChange={(e) => setBorn(e.target.value)}
        />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default SetBirthyear;
