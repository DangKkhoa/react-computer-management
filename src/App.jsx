import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Sidebar from './components/Sidebar'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Inventory from './pages/Inventory'
import Customers from './pages/Customers'
import Users from './pages/Users'
import SaleHistory from './pages/SaleHistory'
import Shop from './pages/Shop'
// import NotFound from './pages/NotFound'


const App = () => {

  const location = useLocation();

  return (
    
    <div className='h-screen inset-0 bg-gradient-to-br from-sky-100  via-white to-sky-100'>
    
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route 
          path="/dashboard" 
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route 
          path="/orders" 
          element={
            <MainLayout>
              <Orders />
            </MainLayout>
          }
        />
        <Route 
          path="/inventory" 
          element={
            <MainLayout>
              <Inventory />
            </MainLayout>
          }
        />
        <Route 
          path="/customers" 
          element={
            <MainLayout>
              <Customers />
            </MainLayout>
          }
        />
        <Route 
          path="/users" 
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />
        <Route 
          path="/sale-history" 
          element={
            <MainLayout>
              <SaleHistory />
            </MainLayout>
          }
        />
      </Routes>
    
    </div>
    
  )
}

export default App