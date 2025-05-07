import React, { useEffect, useRef, useState, useContext } from 'react'

import background from '../assets/background-1.png'
import Input from '../components/Input'
import { AuthContext } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router'


const Login = () => {
  useEffect(() => {
    document.title = 'Login'
  }, [])

  const { user, login, isLoading } = useContext(AuthContext);
  const [input, setInput] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      user.role === 'ADMIN' ?  navigate('/dashboard') : navigate('/profile');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input.username|| !input.password) {
      alert('Please fill in all fields');
      return;
    }

    const res = await login(input.username, input.password);
    console.log(res);
    if(isLoading) {
      return <div className='p-6 text-center text-gray-800 text-lg'>Loading...</div>
    }
    if(res.status === 'failed') {
      alert(res.message);
      return;
    }
    if(res.status === 'success') {
      res.data.role === 'ADMIN' ?  navigate('/dashboard') : navigate('/orders');
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });
    console.log(value);
  }


  return (
    <div 
      className='relative h-screen flex justify-center items-center bg-cover bg-no-repeat'
      style={{
        backgroundImage: `url(${background})`
      }}
      >
        <form 
          className='w-lg bg-white absolute top-5 right-5 border border-gray-500 px-5 py-10 opacity-90  shadow-lg'
          onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold mb-4'>Login</h1>
          <Input 
            type="text" 
            placeholder="example@email.com or 0123456789" 
            id="username" 
            name="username"
            label="Email or Phone number"
            onChange={handleInputChange}/>
          <Input 
            type="password" 
            placeholder="xxxxxx" 
            id="password" 
            name="password"
            label="Password"
            onChange={handleInputChange}/>
          
          <div className='flex justify-between items-center mb-4'>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 hover:bg-blue-700'>Login</button>
            <a href="/forgot-password" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <p>Don't have an account? Click <a href="/customer/register" className='text-blue-500 hover:underline'>here</a>.</p>
        </form>
      </div>
    
  )
}

export default Login