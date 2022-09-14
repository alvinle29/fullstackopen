import React from 'react'
import Weather from "./Weather"

const Country = ({ country, weather }) => {
  if (!country) return null

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map(language =>
          <li key={language.iso639_2}>
            {language.name}
          </li>  
        )}
      </ul>
      <img 
        src={country.flag} 
        alt={`flag of ${country.name}`}
        width='150'
        height='auto'
      />
      <Weather 
        weather={weather}
        capital={country.capital} 
      />
    </div>
  )
}

export default Country