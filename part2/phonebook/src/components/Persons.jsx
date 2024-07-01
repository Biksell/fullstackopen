import Person from "./Person"

const Persons = ({persons, deleteHandler}) => {
  return (
    <div>
      <div>
        {persons.map(person => <Person key={person.id} id={person.id} name={person.name} number={person.number} deleteHandler={deleteHandler}/>)}
      </div>
    </div>
  )
}

export default Persons
