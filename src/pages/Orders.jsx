import React, { useEffect } from 'react'
import Header from '../components/Header'

const Orders = () => {
  useEffect(() => {
    document.title = 'Orders';
    console.log("Tao da vao order nhung bi vang ra");
  }, [])
  return (
    <div>
      <Header title="Orders"/>
    </div>
  )
}

export default Orders