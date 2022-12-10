import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const isNameInPersons = (name) => {
    const names = persons.map((person) => person.name)
    return names.indexOf(name) !== -1
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (isNameInPersons(newName)) {
      alert(`${newName} is already added to phonebook`);
      return
    }
    const personObject = {
      name: newName
    }
    console.log('add :', newName);
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p key={person.name}>{person.name}</p>)}
    </div>
  );
};

export default App;
