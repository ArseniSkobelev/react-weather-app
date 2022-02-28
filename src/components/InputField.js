import React from 'react'

export default function InputField(props) {
  return (
    <input 
        onChange={props.onChange}
        type="text"
        placeholder={props.placeholder ? props.placeholder : 'Input placeholder'}
        className='border border-1 px-1 border-blue-500'
    />
  )
}
