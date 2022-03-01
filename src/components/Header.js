import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-center items-left flex-col py-5'>
        <h1 className='text-3xl font-semibold'>
            Simple React Weather App
        </h1>
        <p className='text-xl py-2'>
            <i>A simple weather app made with:</i>
        </p>
        <ul className='flex flex-col w-full'>
            <li>* React JS</li>
            <li>* Tailwind CSS</li>
            <li>* Icons8.com (Weather icons are provided by them)</li>
        </ul>
    </div>
  )
}
