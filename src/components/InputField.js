import React from 'react'

export default function InputField(props) {
  return (
    <input 
        onChange={props.onChange}
        type="text"
        placeholder={props.placeholder ? props.placeholder : 'Input placeholder'}
        className="md:text-2xl md:py-1 border border-1 px-1 border-blue-500"
    />
  )
}
