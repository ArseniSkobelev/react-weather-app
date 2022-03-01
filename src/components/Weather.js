import React, { useState } from 'react'
import Button from './Button'
import WeatherDisplay from './WeatherDisplay'
import InputField from './InputField'
import { useAlert } from 'react-alert'
import { slideInUp } from 'react-animations'
import Radium, {StyleRoot} from 'radium'
import Header from './Header'
const kelvinToCelsius = require('kelvin-to-celsius')

export default function Weather() {
  const styles = {
    slideInUp: {
      animation: 'x 1s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    }
  }

  const [userCity, setUserCity] = useState('');

  const alert = useAlert();

  const [weatherResultShow, setWeatherResultShow] = useState(false);

  const [temperature, setTemperature] = useState(0.0);

  const [temperatureMin, setTemperatureMin] = useState(0.0);

  const [temperatureMax, setTemperatureMax] = useState(0.0);

  const [windSpeed, setWindSpeed] = useState(0.0);

  const [currentWeather, setCurrentWeather] = useState('');

  const [city, setCity] = useState('');

  const [weatherIconTwo, setWeatherIconTwo] = useState('');

  function getLatAndLong() {
    if(city) {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          if(result.length === 0) {
            alert.show('The city was not found in the APIs database! Please check your input!')
          } else getWeather(result[0].lat, result[0].lon)
          
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
    setWeatherResultShow(false);
  };

  function getWeather(latitude, longtitude) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          setCurrentWeather(result.weather[0].main)
          setImage(result.weather[0].main)
          setTemperature(Math.round(kelvinToCelsius(result.main.temp)))
          setTemperatureMin(Math.round(kelvinToCelsius(result.main.temp_min)))
          setTemperatureMax(Math.round(kelvinToCelsius(result.main.temp_max)))
          setWindSpeed(Math.round(kelvinToCelsius(result.wind.speed)))
          setCity(result.name)
        },
        (error) => {
          console.log(error)
          alert.show('The city was not found in the APIs database! Please check your input!')
        }
        )
      }
      
      function setImage(weatherState) {
        if(weatherState === "clear" || weatherState === "Clear") {
          setWeatherIconTwo(require('../img/clear.png'));
        }
        else if(weatherState === "rain" || weatherState === "Rain" || weatherState === "Shower rain" ||  weatherState === "shower rain" || weatherState === "Drizzle" ||  weatherState === "drizzle") {
          setWeatherIconTwo(require('../img/rain.png'));
        }
        else if(weatherState === "mist" || weatherState === "Mist") {
          setWeatherIconTwo(require('../img/cloudy-day.png'));
        }
        else if(weatherState === "snow" || weatherState === "Snow"){  
          setWeatherIconTwo(require('../img/snow.png'));
        }
        else if(weatherState === "scattered clouds" || weatherState === "broken clouds" || weatherState === "Scattered clouds" || weatherState === "Broken clouds" || weatherState === "clouds" || weatherState === "Clouds") {
          setWeatherIconTwo(require('../img/clouds.png'));
        } else {
          setWeatherIconTwo(require('../img/clouds.png'));
        }
        setWeatherResultShow(true);
  }
  
  return (
    <div className={`z-1 flex items-center w-full bg-cover bg-no-repeat bg-center justify-center flex-col h-full bg-white`}>
      <Header />
      <div className='w-full flex justify-center flex-col items-center h-full'>
        {
          weatherResultShow &&
          <WeatherDisplay iconSrc={weatherIconTwo} weather={currentWeather} windSpeed={windSpeed} temperatureMin={temperatureMin} temperatureMax={temperatureMax} temperature={temperature} city={userCity} />
        }
        <InputField onChange={handleChange} placeholder='Enter city'/>
        <Button onClick={getLatAndLong} text="Get weather" />
      </div>
    </div>
  )
}