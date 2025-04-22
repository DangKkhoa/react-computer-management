import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Check, Eye, Trash, X } from 'lucide-react'

import Search from '../components/Search'
import Button from '../components/Button'
import Modal from '../components/Modal'
const ORDERS = [ 
  {
    id: 1,
    // name: '',
    customer: 'John Doe',
    date: '2023-10-01',
    totalPrice: 100,
    saleperson: 'Will',
    status: 'Pending',
  },
  {
    id: 2,
    // name: '',
    customer: 'Jane Smith',
    date: '2023-10-02',
    totalPrice: 200,
    saleperson: 'Will',
    status: 'Confirmed',
  },
  {
    id: 3,
    // name: '',
    customer: 'Alice Johnson',
    date: '2023-10-03',
    totalPrice: 150,
    saleperson: 'Marry',
    status: 'Completed',
  },
  {
    id: 4,
    // name: '',
    customer: 'Bob Brown',
    date: '2023-10-04',
    saleperson: 'Bob',
    totalPrice: 250,
    status: 'Cancelled',
  },
  {
    id: 5,
    // name: '',
    customer: 'Charlie Davis',
    date: '2023-10-05',
    totalPrice: 300,
    saleperson: 'Robert',
    status: 'Pending',
  },
]






const Orders = () => {
  const [filteredOrders, setFilterOrders] = useState(ORDERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // useEffect(() => {
  //   setFilterOrders(prev => prev.filter(order => order.status === "Pending"))
  // }, [])

  const onCancelClick = (id) => {
    setIsModalOpen(true);
    setSelectedOrder(id);
  }

  const onCancelConfirm = (id) => {
    // Handle order cancellation logic here
    setIsModalOpen(false);
    const newOrders = ORDERS.map(order => (order.id === selectedOrder ? {...order, status: "Cancelled"} : order));
    setFilterOrders(newOrders);
  }

  const onConfirmOrder = (id) => {
    // Handle order confirmation logic here
    const newOrders = ORDERS.map(order => (order.id === id ? {...order, status: "Confirmed"} : order));
    setFilterOrders(newOrders);
  }

  
  return (
    <div>
      <Header title="Orders"/>
      <main className='mt-4 p-6 w-full'>
        <div>
          <div className='flex justify-between items-center mb-4'>
            {/* <h1 className='text-2xl font-bold'>Orders</h1> */}
            <div className='flex items-center'>
              <Search placeholder="Search orders" data={ORDERS} setData={setFilterOrders} />
              <Button className='ml-4' variant="primary">
                Add Order
              </Button>
            </div>
          </div>
        </div>
        <div className='w-full overflow-auto'>
          <table className='w-full text-nowrap min-w-96'>
            <thead>
              <tr>
                <th className='border-b border-gray-300 group'>Order ID</th>
                <th className='border-b border-gray-300 group'>Customers</th>
                <th className='border-b border-gray-300 group'>Date</th>
                <th className='border-b border-gray-300 group'>Total Price</th>
                <th className='border-b border-gray-300 group'>Saleperson</th>
                <th className='border-b border-gray-300 group'>Status</th>
                <th className='border-b border-gray-300 group'>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className='group hover:shadow-[0px_-1px_10px_rgba(0,0,0,0.25)] transition-all duration-300 text-center'>
                  <td className='border-b border-gray-300 py-4 group-hover:border-none'>{order.id}</td>
                  <td className='border-b border-gray-300 py-4 group-hover:border-none'>{order.customer}</td>
                  <td className='border-b border-gray-300 py-4 group-hover:border-none'>{order.date}</td>
                  <td className='border-b border-gray-300 py-4 group-hover:border-none'>{order.totalPrice}</td>
                  <td className='border-b border-gray-300 py-4 group-hover:border-none'>{order.saleperson}</td>
                  <td className='border-b border-gray-300 py-4 group-hover:border-none'>
                    <span className={`px-4 text-white ${order.status === 'Pending' ? "bg-yellow-500" : order.status === "Cancelled" ? "bg-red-500" : "bg-green-500"}`}>{order.status}</span>
                  </td>
                  
                  <td className='border-b border-gray-300 py-4 group-hover:border-0'>
                    {order.status === "Pending" && (
                      <>
                        <button 
                          className='text-red-500  hover:text-red-600 transition-all duration-200 hover:scale-110'
                          onClick={() => onCancelClick(order.id)}>
                            <X />
                        </button>
                        <button 
                          className='text-green-500 hover:text-green-600 ml-2 transition-all duration-200 hover:scale-110'
                          onClick={() => onConfirmOrder(order.id)}
                        >
                            <Check />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))} 
            </tbody>
          </table>
        </div>

        {isModalOpen && ( 
          <Modal 
            isOpen={isModalOpen}
            title="Cancel Order"
            message={`Are you sure you want to cancel order ${selectedOrder}?`}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => onCancelConfirm(selectedOrder)}
          />
        )}
      </main>
    </div>
  )
}

export default Orders