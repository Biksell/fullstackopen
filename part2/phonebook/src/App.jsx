import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')
  const [notification, setNotification] = useState({message: "", type: ""})

  // Render persons
  useEffect(() => {
    console.log("Fetching persons from server")
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  console.log("Rendering ", persons.length, " persons")

  // Add person
  const addPerson = (event) => {
    event.preventDefault()
    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson !== undefined) {
      if (confirm(`${foundPerson.name} is already added to the phonebook. Do you want to replace the old number with a new one?`)) updatePerson(foundPerson.id)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log("Adding person to database...")
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        const updatedNotification = {message: `${returnedPerson.name} has been added`, type: "information"}
        setNotification(updatedNotification)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  // Delete person
  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if (!confirm(`Do you want to delete ${person.name}?`)) return
    console.log("Deleting person with id " + id)
    personService
      .remove(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== returnedPerson.id))
        const updatedNotification = {message: `${returnedPerson.name} has been deleted`, type: "information"}
        setNotification(updatedNotification)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        const updatedNotification = {message: `${person.name} has already been removed from the server`, type: "error"}
        setNotification(updatedNotification)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  // Update person's number
  const updatePerson = id => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = {...person, number: newNumber}

    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNewName("")
        setNewNumber("")
        const updatedNotification = {message: `${returnedPerson.name} has been updated`, type: "information"}
        setNotification(updatedNotification)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        const updatedNotification = {message: `${person.name} has already been removed from the server`, type: "error"}
        setNotification(updatedNotification)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
      })
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
      <Notification notification={notification}/>
        <Filter filter={currentFilter} handler={handleFilterChange}/>
      <h3>Add a new person</h3>
        <PersonForm newName={newName} newNumber={newNumber} nameHandler={handleNameChange} numberHandler={handleNumberChange} addHandler={addPerson}/>
      <h3>Numbers</h3>
        <Persons persons={filteredPersons} deleteHandler={deletePerson}/>
    </div>
  )
}

export default App
