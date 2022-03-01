import React from 'react'

export default function WeatherDisplay(props) {
    let weather = props.weather
    
    let windSpeed = props.windSpeed

    let temperatureMin = props.temperatureMin

    let temperatureMax = props.temperatureMax

    let temperature = props.temperature

    let city = props.city

  return (
    <div className="flex items-left justify-center flex-col pb-8">
        <div className='flex flex-column justify-center items-center text-center capitalize'>
            <h1 className='text-2xl py-3'>{city}</h1>
        </div>
        <div className='flex flex-column justify-center items-center'>
            <h1 className='text-3xl font-medium'>{temperature}°C</h1>
        </div>
        <div className='flex flex-column justify-center items-center'>
            <h1 className='text-base py-2'>{weather}</h1>
        </div>
        <div className='flex flex-row justify-center items-center'>
            <h1 className='text-base px-1'>Min: {temperatureMin}°C</h1>
            <h1 className='text-base px-1'>Max: {temperatureMax}°C</h1>
        </div>
    </div>
  )
}
