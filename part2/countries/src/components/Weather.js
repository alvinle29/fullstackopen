import React from 'react'

const Weather = ({ weather, capital }) => {
  if (!weather) return null

  const temp = weather.current.temperature
  const windDir = weather.current.wind_dir
  const windSpeed = weather.current.wind_speed
  const weatherIcon = weather.current.weather_icons[0]
  const weatherDesc = weather.current.weather_descriptions[0]

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div><b>Temperature:</b> {temp} Celcius</div>
      <img 
        src={weatherIcon} 
        alt={weatherDesc} 
        width='64'
        height='64'
      />
      <div><b>Conditions:</b> {weatherDesc}</div>
      <div><b>Wind:</b> {windSpeed} direction {windDir} kph</div>
    </div>
  )
}

export default Weather

