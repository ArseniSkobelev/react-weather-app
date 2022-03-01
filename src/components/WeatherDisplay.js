import React from 'react'
import WeatherIcon from './WeatherIcon'

export default function WeatherDisplay(propse) {
    let weather = propse.weather
    
    let windSpeed = propse.windSpeed

    let temperatureMin = propse.temperatureMin

    let temperatureMax = propse.temperatureMax

    let temperature = propse.temperature

    let city = propse.city

  return (
    <div className="flex items-left justify-center flex-col pb-12">
        <WeatherIcon srca={propse.iconSrc} />
        <div className='flex flex-column justify-center items-center text-center capitalize'>
            <h1 className='text-2xl md:text-3xl xl:text-4xl py-3 xl:py-5'>{city}</h1>
        </div>
        <div className='flex flex-column justify-center items-center xl:pt-2'>
            <h1 className='text-3xl md:text-4xl xl:text-5xl font-medium'>{temperature}°C</h1>
        </div>
        <div className='flex flex-column justify-center items-center xl:pt-2'>
            <h1 className='text-base md:text-xl xl:text-2xl py-2 xl:py-3'><i>{weather}</i></h1>
        </div>
        <div className='flex flex-row justify-center items-center xl:pt-2'>
            <h1 className='text-base md:text-xl xl:text-2xl px-1 xl:px-4'>Min: {temperatureMin}°C</h1>
            <h1 className='text-base md:text-xl xl:text-2xl px-1 xl:px-4'>Max: {temperatureMax}°C</h1>
        </div>
    </div>
  )
}
