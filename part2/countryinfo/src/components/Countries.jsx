import Country from "./Country"
import Weather from "./Weather"


const Countries = ({countries, showHandler}) => {
  console.log(countries.length)
  if (countries.length > 10) {
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map(c =>
          <div key={c.cca2}>
            {c.name.common}
            <button onClick={() => showHandler([c])}>show</button>
          </div>
        )}
      </>
    )
  } else if (countries.length == 1) {
    return (
      <>
        <Country country={countries[0]}/>
        <Weather country={countries[0]}/>
      </>
    )
  }

  return (
    <>
    </>
  )

}

export default Countries
