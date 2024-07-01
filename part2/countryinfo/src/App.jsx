import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Countries from "./components/Countries"
import countryService from "./services/countries"

function App() {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState("")
  const [showSingle, setShowSingle] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  if(!countries) {
    return null
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    const newFilter = event.target.value
    console.log(event.target.value)
    setFilter(newFilter)
    setShowSingle(null)
  }

  const handleShowSingle = country => {
    setShowSingle(country)
    setFilter("")
  }

  const filteredCountries = countries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase()) ||
    c.name.official.toLowerCase().includes(filter.toLowerCase()) )


  return (
    <div>
      <Filter filter={filter} handler={handleFilterChange}/>
      <Countries countries={showSingle ? showSingle : filteredCountries} showHandler={handleShowSingle}/>
    </div>
  )
}

export default App
