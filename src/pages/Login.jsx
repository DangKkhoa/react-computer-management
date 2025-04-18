import React, { useEffect, useRef } from 'react'
import background from '../assets/background-1.png'
import Input from '../components/Input'


const Login = () => {
  useEffect(() => {
    document.title = 'Login'
  }, [])
  return (
    <div 
      className='relative h-screen flex justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${background})`
      }}
      >
        <form action="" className='w-lg bg-white absolute top-5 right-5 border border-gray-500 px-5 py-10 opacity-90  shadow-lg'>
          <h1 className='text-2xl font-bold mb-4'>Login</h1>
          <Input 
            type="text" 
            placeholder="example@email.com or 0123456789" 
            id="email" 
            label="Email or Phone number"/>
          <Input 
            type="password" 
            placeholder="xxxxxx" 
            id="password" 
            label="Password"/>
          
          <div className='flex justify-between items-center mb-4'>
            <button className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700'>Login</button>
            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <p>Don't have an account? Click <a href="/customer/register" className='text-blue-500 hover:underline'>here</a>.</p>
        </form>
      </div>
    
  )
}

export default Login