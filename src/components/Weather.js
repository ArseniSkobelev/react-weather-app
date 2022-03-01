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

  const [gradient, setGradient] = useState(false);

  const [gradientClass, setGradientClass] = useState('');

  // sun - 'bg-gradient-to-r from-amber-400 to-orange-500'
  // rain - 'bg-gradient-to-r from-indigo-800 to-blue-900'
  // clouds - 'bg-gradient-to-r from-gray-400 to-stone-500'
  // snow - 'bg-gradient-to-r from-stone-200 to-white'
  // fog - 'bg-gradient-to-r from-neutral-300 to-neutral-400'
  
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
        console.log(newWeather)
        if(newWeather === "rain" || newWeather === "shower rain" || newWeather === "drizzle") {
          setGradientClass('bg-gradient-to-r from-indigo-800 to-blue-900')
          setGradient(true);
        }
        
        else if(newWeather === "scattered clouds" || newWeather === "broken clouds" || newWeather === "clouds") {
          setGradientClass('bg-gradient-to-r from-gray-400 to-stone-500')
          setGradient(true);
        }

        else if(newWeather === "clear" || newWeather === "Clear") {
          setGradientClass('bg-gradient-to-r from-amber-400 to-orange-500')
          setGradient(true);
        }

        else if(newWeather === "snow") {
          setGradientClass('bg-gradient-to-r from-stone-200 to-white')
          setGradient(true);
        }
        
        else if(newWeather === "mist") {
          setGradientClass('bg-gradient-to-r from-neutral-300 to-neutral-400')
          setGradient(true);
        }

        console.log(newWeather)
  }
  
  return (
    <div className={`z-1 flex items-left w-70 px-12 bg-cover bg-no-repeat bg-center justify-center flex-col h-full p-4 ${gradient ? gradientClass : " "}`}>
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