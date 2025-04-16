import React from 'react'

const Input = ({type, placeholder, id, label, value, onChange}) => {
  return (
    <div className='mb-4 relative'>
      <label htmlFor={id} className='block mb-1 w-fit'>{label}</label>
      <input 
        className='w-full py-1 pl-2 pr-6 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500'
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}/> 
      {type === 'password' && (
        <i className="fa-solid fa-eye absolute right-2 bottom-2 cursor-pointer"></i>
      )}
    </div>
  )
}

export default Input