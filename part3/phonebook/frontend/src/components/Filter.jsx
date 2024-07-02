const Filter = ({filter, handler}) => {
  return (
    <div>
      Filter persons:
      <input
        value={filter}
        onChange={handler}
      />
    </div>
  )
}

export default Filter
