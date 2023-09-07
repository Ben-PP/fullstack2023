import Person from "./Person"

const Numbers = ({ persons, filter, onDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {
        persons.map(person => {
          if (person.name.match(new RegExp(filter,'i')) || filter === undefined) {
            return <Person key={person.name} person={person} onDelete={onDelete} />
          }
        })
      }
    </div>
  )
}

export default Numbers