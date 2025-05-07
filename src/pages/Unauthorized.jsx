import React from 'react'

const Unauthorized = () => {
  return (
    <div className='ml-4 pt-4'>
      <h1 className='text-4xl font-bold text-red-500 mb-4'>You don't have permission to access this page!!!</h1>
      <a href="/profile" className='text-lg mt-4 underline hover:text-blue-800'>Click here to go to profile page</a>
    </div>
  )
}

export default Unauthorized