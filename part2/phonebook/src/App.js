import { useState, useEffect } from 'react'
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import personService from "./services/personService"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p =>
      p.name.toUpperCase() === newName.toUpperCase())

    if (person) {
      /*return window.alert(
        `${newName} is already added to phonebook`
      )*/

      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (!confirmUpdate) return

      const PersonToBeUpdate = {
        ...person,
        number: newNumber
      }

      return personService
        .update(person.id, PersonToBeUpdate)
        .then(updatedPerson => {
          setPersons(persons.map(p =>
            p.id === person.id ? updatedPerson : p))
        })
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService
      .create(personObject)
      .then((personAdded => {
        setPersons(persons.concat(personAdded))
        setNewName('')
        setNewNumber('')

        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      )
  }

  const removePerson = (id) => {
    const personToRemove = persons.find(p => p.id === id)

    const confirmRemove = window.confirm(`Delete ${personToRemove.name}?`)

    if (confirmRemove) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`${personToRemove.name} already deleted`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const personsToShow = filter === ''
    ? persons
    : persons.filter(person =>
      person.name
        .toUpperCase()
        .includes(filter.toUpperCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        removePerson={removePerson} />
    </div>
  )
}

export default App