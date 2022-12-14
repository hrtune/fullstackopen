import { useState, useEffect } from "react";
import axios from "axios";

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

const Button = ({type, text}) => (
  <>
    <button type={type}>{text}</button>
  </>
)

const Form = ({onSubmit, inputs, button}) => {
  return(
    <div>
      <form onSubmit={onSubmit}>
        {inputs.map((input) => <Input key={input.text} text={input.text} value={input.value} onChange={input.onChange} />)}
        <Button type={button.type} text={button.text} />
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect!");
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log(response.data);
        setPersons(response.data);
      })
  }, [])

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

    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        console.log(`add id:${response.data.id} to server`);
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        alert("Something bad happened, try again.")
      })
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

  const inputs = [
    {
      text: "name",
      value: newName,
      onChange: handleNameChange
    },
    {
      text: "number",
      value: newNumber,
      onChange: handleNumberChange
    }
  ]
  

  return (
    <div>
      <Header text="Phonebook" />
      <Input text="filter shown with" value={filter} onChange={handleFilter} />
      <Header text="add a new" />
      <Form onSubmit={addPerson} inputs={inputs} button={{type:"submit", text: "add"}} />
      <Header text="Numbers" />
      <Persons persons={filteredPersons()} />
    </div>
  );
};

export default App;
