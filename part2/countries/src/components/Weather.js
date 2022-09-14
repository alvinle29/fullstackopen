import React from 'react'

function tempConverter(temp) {
  return (temp-273.15).toFixed(1)
}

const Weather = ({ weather, capital }) => {
  if (!weather) return null

  const temp = weather.main.temp
  const humidity = weather.main.humidity
  const windSpeed = weather.wind.speed
  const weatherIcon = weather.weather[0].icon
  const weatherDesc = weather.weather[0].description

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div><b>Temperature:</b> {tempConverter(temp)} degree Celcius</div>
      <div><b>Humidity:</b> {humidity}%</div>
      <img
        src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt={weatherDesc}
        width='64'
        height='64'
      />
      <div><b>Conditions:</b> {weatherDesc}</div>
      <div><b>Wind:</b> {windSpeed} kph</div>
    </div>
  )
}

export default Weather

