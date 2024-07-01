import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson !== undefined) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setCurrentFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(currentFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={currentFilter} handler={handleFilterChange}/>
      <h3>Add a new person</h3>
        <PersonForm newName={newName} newNumber={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} addHandler={addPerson}/>
      <h3>Numbers</h3>
        <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App
