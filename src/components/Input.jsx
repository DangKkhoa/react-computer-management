import React, { useState } from 'react'

const Input = ({type, placeholder, id, name, labelClass, inputClass, label, value, onChange}) => {
  const [isVisible, setIsVisible] = useState(false);

  
  const togglePasswordVisibility = () => {
    setIsVisible(prev => !prev);
  }

  const inputType = type === 'password' && isVisible ? 'text' : type;
  

  return (
    <div className='mb-4 relative'>
      <label htmlFor={id} className={`block mb-1 w-fit ${labelClass}`}>{label}</label>
      <input 
        className={`w-full py-1 px-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 ${inputClass}`}
        type={inputType}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}/> 
      {type === 'password' && (
        <i 
          onClick={togglePasswordVisibility}
          className={`fa-solid ${isVisible ? 'fa-eye-slash' : 'fa-eye'} absolute right-2 bottom-2 cursor-pointer`}></i>
      )}
    </div>
  )
}

export default Input