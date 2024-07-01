import {useState, useEffect} from "react"
import axios from "axios"

const api_key = import.meta.env.VITE_SOME_KEY
const baseURL = "https://api.openweathermap.org/data/2.5/weather?q="

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
    .get(`${baseURL}${country.capital[0]},${country.cca2}&appid=${api_key}&units=metric`)
    .then(response => {
      const weatherObj = {
        temperature: response.data.main.temp,
        wind: response.data.wind.speed,
        img: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      }
      setWeather(weatherObj)
    })
  }, [])

  if(!weather) return null

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature is {weather.temperature} Celcius</p>
      <p>Wind is {weather.wind} m/s</p>
      <img src={weather.img}/>
    </div>
  )
}

export default Weather
