import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Results from './components/Result'
//import Country from './components/Country'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])
  //const [country, setCountry] = useState(null)
  //const [weather, setWeather] = useState(null)

  // Get country data
  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)

    const results = countries
      .filter(country =>
        country.name.toUpperCase()
          .includes(event.target.value.toUpperCase())  
      )
    setResults(results)

  }

  const handleShowClick = (country) => (
    () => {
      setFilter(country.name)
      setResults([country])
      //setCountry(country)
    }
  )

  return (
    <div>
      <Filter 
        filter={filter}
        handleFilterChange={handleFilterChange} 
      />
      <Results
        filter={filter}
        results={results}
        handleShowClick={handleShowClick}
      />

    </div>
  )
}

export default App