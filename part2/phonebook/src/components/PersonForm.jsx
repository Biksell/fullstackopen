const PersonForm = ({newName, newNumber, nameHandler, numberHandler, addHandler}) => {
  return (
    <div>
      <form onSubmit={addHandler}>
        <div>
          Name:
          <input
            value={newName}
            onChange={nameHandler}
          />
        </div>
        <div>
          Number:
          <input
            value={newNumber}
            onChange={numberHandler}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
