import React from 'react'
import Header from '../components/Header'

const Shop = () => {
  return (
    <div>
      <Header title="GROUP 7">
      <a href="/orders" className='mr-2'>Orders</a>
      <a href="/history" className='mr-2'>History</a>
      </Header>
    </div>
  )
}

export default Shop