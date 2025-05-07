import React from 'react'
import { Routes, Route, useLocation } from 'react-router'

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
import RoleRoute from './route/RoleRoute'
import Unauthorized from './pages/Unauthorized'
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
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route 
          path="/dashboard" 
          element={
            <RoleRoute allowRoles={["ADMIN"]}>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </RoleRoute>
          }
        />
        <Route 
          path="/orders" 
          element={
            <RoleRoute allowRoles={["ADMIN", "SALESPERSON"]}>
              <MainLayout>
                <Orders />
              </MainLayout>
            </RoleRoute>
          }
        />
        <Route 
          path="/inventory" 
          element={
            <RoleRoute allowRoles={["ADMIN", "SALESPERSON"]}>
              <MainLayout>
                <Inventory />
              </MainLayout>
            </RoleRoute>
          }
        />
        <Route 
          path="/customers" 
          element={
            <RoleRoute allowRoles={["ADMIN", "SALESPERSON"]}>
              <MainLayout>
                <Customers />
              </MainLayout>
            </RoleRoute>
          }
        />
        <Route 
          path="/users" 
          element={
            <RoleRoute allowRoles={["ADMIN"]}>
              <MainLayout>
                <Users />
              </MainLayout>
            </RoleRoute>
          }
        />
        <Route 
          path="/sale-history" 
          element={
            <RoleRoute allowRoles={["ADMIN", "ACCOUNTANT"]}>
              <MainLayout>
                <SaleHistory />
              </MainLayout>
            </RoleRoute>
          }
        />
      </Routes>
    
    </div>
    
  )
}

export default App