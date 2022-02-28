import React, { useState } from 'react'
import Button from './Button'
import WeatherDisplay from './WeatherDisplay'
import InputField from './InputField'
import { useAlert } from 'react-alert'
import { slideInUp } from 'react-animations'
import Radium, {StyleRoot} from 'radium'
const kelvinToCelsius = require('kelvin-to-celsius')

export default function Weather() {
  const styles = {
    slideInUp: {
      animation: 'x 1s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }
  }

  const [userCity, setUserCity] = useState('');

  const [bGradient, setbGradient] = useState('');

  const alert = useAlert();

  const [weatherResultShow, setWeatherResultShow] = useState(false);

  const [temperature, setTemperature] = useState(0.0);

  const [temperatureMin, setTemperatureMin] = useState(0.0);

  const [temperatureMax, setTemperatureMax] = useState(0.0);

  const [windSpeed, setWindSpeed] = useState(0.0);

  const [currentWeather, setCurrentWeather] = useState('Weather');

  const [city, setCity] = useState('');
  
  function getLatAndLong() {
    if(city) {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
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
    setUserCity(e.target.value)
  };

  function getWeather(latitude, longtitude) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setTemperature(Math.round(kelvinToCelsius(result.main.temp)))
          setTemperatureMin(Math.round(kelvinToCelsius(result.main.temp_min)))
          setTemperatureMax(Math.round(kelvinToCelsius(result.main.temp_max)))
          setWindSpeed(Math.round(kelvinToCelsius(result.wind.speed)))
          setCurrentWeather(result.weather[0].main)
          setCity(result.name)
          
          getBgImage(result.weather[0].main)
          
        },
        (error) => {
          console.log(error)
        }
        )
        
        setWeatherResultShow(true);
        
      }
      
      function getBgImage(weather) {
        let newWeather = weather.toLowerCase();
        if(newWeather == "rain" || newWeather == "shower rain" || newWeather == "drizzle") {
          
        }
        
        if(newWeather == "clear sky" || newWeather == "few clouds") {
          
        }
        
        if(newWeather == "scattered clouds" || newWeather == "broken clouds" || newWeather == "clouds") {
          
        }

        if(newWeather == "clear") {
          setbGradient('clear')
        }

        if(newWeather == "snow") {
          
        }
        
        if(newWeather == "mist") {

        } else {
          
        }

        console.log(newWeather)
  }
  
  return (
    <div className='flex items-left w-70 px-12 bg-cover bg-no-repeat bg-center justify-center flex-col h-full p-4' style={{}}>
        {
          weatherResultShow &&
          <WeatherDisplay weather={currentWeather} windSpeed={windSpeed} temperatureMin={temperatureMin} temperatureMax={temperatureMax} temperature={temperature} city={userCity} />
        }
        {/* <div id="background">
          <img src={backgroundImage} alt="" />
        </div> */}
        <InputField onChange={handleChange} placeholder='Enter city'/>
        <Button onClick={getLatAndLong} text="Get weather" width="200px" />

    </div>
  )
}