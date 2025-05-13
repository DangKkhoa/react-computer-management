import React, { useEffect } from 'react'
import Header from '../components/Header'

const Orders = () => {
  useEffect(() => {
    document.title = 'Đơn hàng';
    // console.log("Tao da vao order nhung bi vang ra");
  }, [])
  return (
    <div>
      <Header title="Đơn hàng"/>
    </div>
  )
}

export default Orders