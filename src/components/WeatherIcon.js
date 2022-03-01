import React from 'react'

export default function WeatherIcon(propse) {
  return (
    <div className='flex flex-column justify-center items-center text-center capitalize'>
        <img src={propse.srca} alt="weather-icon" />
    </div>
  )
}