import { useState } from "react";

const SetBirthyear = ({ editBirth }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const submit = (event) => {
    event.preventDefault();
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
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
