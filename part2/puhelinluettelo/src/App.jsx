import { useState, useEffect } from 'react'
import personService from './services/persons'
import Numbers from './components/Numbers'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(e => e.name === newName) !== undefined) {
      updatePerson(newName)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService.create(newPerson).then(returnedPerson => {
      setPersons([...persons, returnedPerson])
      setNewName('')
      setNewNumber('')
    })
  }

  const updatePerson = (name) => {
    if (!window.confirm(`${name} is already added to phonebook,
      do you want to replace the old number with a new one?`)
    ) return
    personService.update({...persons.find(person => person.name === name), number: newNumber})
      .then((data) => {
        setPersons(persons.map(person => person.name === name ? data : person))
        setNewName('')
        setNewNumber('')
        //pushNotification(`Updated the number for ${name}`, 'success')
      }).catch(() => {
        //pushNotification(`${name} has already been removed from server`, 'error')
        setPersons(persons.filter(person => person.name !== name))
      })
  }

  const deletePerson = (id) => {
    if (!window.confirm(`Do you want to delete ${persons.find(person => person.id === id).name}?`)) return
    personService.deletePerson(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <AddPerson
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <Numbers persons={persons} filter={newFilter} onDelete={deletePerson} />
    </div>
  )

}

export default App