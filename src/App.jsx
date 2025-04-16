import React from 'react'
import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
// import NotFound from './pages/NotFound'


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/customer/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default App