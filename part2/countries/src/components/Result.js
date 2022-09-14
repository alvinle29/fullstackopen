import React from 'react'
// import Country from '../components/Country'

const Result = ({ filter, result, handleShowButton }) => {
  if (filter === '' || result.length === 1) return null
  
  if (result.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (result.length > 1) {
    return (
      <>
        {result.map(country => 
          <div key={country.alpha3Code}>
            {`${country.name} `}
            <button 
              onClick={handleShowButton(country)}>
                show
            </button>
          </div>
        )}
      </>
    )
  }
  else return <div>No matches found</div>
}

export default Result