import React, { useState } from 'react'
import Button from './Button'
import InputField from './InputField'
import { useAlert } from 'react-alert'

export default function Weather() {
  const alert = useAlert()

  const [city, setCity] = useState('');
  
  function getLatAndLong() {
    if(city) {
      
      let userCity = city
      
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          getWeather(result[0].lat, result[0].lon)
        },
        (error) => {
          console.log(error)
        }
      )
  
    } else alert.show('Please enter a city name in the field above!')
  }

  function handleChange(e) {
    setCity(e.target.value)
  };

  function getWeather(latitude, longtitude) {
    
    console.log("Latitude: " + latitude)
    console.log("Longtitude: " + longtitude)

  }

  return (
    <div className='flex items-left w-60 justify-center flex-col h-full p-4'>
        <InputField onChange={handleChange} placeholder='Enter city'/>
        <Button onClick={getLatAndLong} text="Get weather" width="200px" />

    </div>
  )
}