import React from 'react'

export default function Button(props) {
  return (
    <button onClick={props.onClick} className={`w-[200px] md:text-2xl md:w-[280px] my-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`}>
        {props.text}
    </button>
  )
}
