import React from 'react'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ children }) => {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 overflow-auto'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout