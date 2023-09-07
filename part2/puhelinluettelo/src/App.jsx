import { useState, useEffect } from 'react'
import personService from './services/persons'
import Numbers from './components/Numbers'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons))
  },[])

  const pushNotification = (message, className) => {
    setNotification({
      text: message,
      className: className
    })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
      pushNotification(`Added ${returnedPerson.name} to phonebook!`, 'successNotification')
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
        pushNotification(`Updated the number for ${name}`, 'successNotification')
      }).catch(() => {
        pushNotification(`${name} has already been removed from server`, 'errorNotification')
        setPersons(persons.filter(person => person.name !== name))
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`Do you want to delete ${person.name}?`)) return
    personService.deletePerson(id)
    .then(() => {
      pushNotification(`Removed ${person.name} from phonebook!`, 'successNotification')
      setPersons(persons.filter(p => p.id !== id))
    }).catch(() => {
      pushNotification(`${person.name} has already been removed from server`, 'error')
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
      <Notification notification={notification} />
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