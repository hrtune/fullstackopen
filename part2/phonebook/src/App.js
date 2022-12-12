import { useState } from "react";

const Input = ({text, value, onChange}) => (
  <div>
    {text}: <input value={value} onChange={onChange} />
  </div>
)

const Person = ({name, number}) => (
  <div>
    <p>{name} {number}</p>
  </div>
)

const Persons = ({persons}) => {
  return (
    persons.map((person) => <Person key={person.name} name={person.name} number={person.number} />)
  )
}

const Header = ({text}) => (
  <>
    <h2>{text}</h2>
  </>
)

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "040-1234567" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
      name: newName,
      number: newNumber
    }
    console.log('add :', newName);
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = () => {
    const filterString = filter.toLowerCase()
    return persons.filter((person) => {
      const loweredName = person.name.toLowerCase()
      return loweredName.includes(filterString)
    })
  }
  

  return (
    <div>
      <Header text="Phonebook" />
      <Input text="filter shown with" value={filter} onChange={handleFilter} />
      <Header text="add a new" />
      <form onSubmit={addPerson}>
        <Input text={"name"} value={newName} onChange={handleNameChange} />
        <Input text={"number"} value={newNumber} onChange={handleNumberChange} />
        <button type="submit">add</button>
      </form>
      <Header text="Numbers" />
      <Persons persons={filteredPersons()} />
    </div>
  );
};

export default App;
