import React from 'react'

const Header = ({ title }) => {
  return (
    <header className='sticky top-0 w-full p-5 shadow-md border-b border-gray-300 flex justify-between items-center'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <div>
        <a href="/login">Login</a>
      </div>
    </header>
  )
}

export default Header