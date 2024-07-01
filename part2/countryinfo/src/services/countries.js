import axios from "axios"
const countryURL = "https://studies.cs.helsinki.fi/restcountries/" //api/all     api/name/{name}

const getAll = () => {
  console.log("Requesting all")
  const request = axios.get(`${countryURL}/api/all`)
  return request.then(response => response.data)
}

const getCountry = (name) => {
  const request = axios.get(`${countryURL}/name/${name}`)
  return request.then(response => response.data)
}

export default {getAll, getCountry}
