import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Result from './components/Result'
import Country from './components/Country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [result, setResult] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (country) {
      const capital = country.capital
      const api_key = process.env.REACT_APP_API_KEY
      const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      axios
        .get(url)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [country])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

    const result = countries
      .filter(country =>
        country.name.toUpperCase()
          .includes(event.target.value.toUpperCase())  
      )
    setResult(result)

    if (result.length === 1) setCountry(result[0])
    else {
      setCountry(null)
      setWeather(null)
    }
  }

  const handleShowButton = (country) => (
    () => {
      setFilter(country.name)
      setResult([country])
      setCountry(country)
    }
  )

  return (
    <div>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange} 
      />
      <Result
        filter={filter}
        result={result}
        handleShowButton={handleShowButton}
      />
      <Country 
        country={country}
        weather={weather}
      />
    </div>
  )
}

export default App