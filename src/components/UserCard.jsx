import React from 'react'
import userImg from '../assets/user-default.png'
import { Eye, Trash2 } from 'lucide-react'

const UserCard = ({ ...props }) => {

  return (
    <div className="group relative bg-white text-sm text-center border border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <button 
        className="absolute top-2 right-2 opacity-0 text-red-500 hover:text-red-600 group-hover:opacity-100 transition duration-300"
        onClick={() => props.deleteUser(props.id, props.name)}>
          <Trash2 />
      </button>
      <div className='p-4'>
        <div 
          className='bg-cover bg-no-repeat w-24 h-24 rounded-full mb-4 mx-auto' 
          style={{ backgroundImage: `url(${userImg})` }}
        ></div>

        <h2 className="text-xl font-semibold mb-2">{props.name}</h2>
        <p className="text-gray-600 mb-2">{props.role}</p>
        <p className="text-gray-600 mb-2">{props.email}</p>
        <div className='flex justify-center items-center gap-4'>
          <button className="bg-gradient-to-tl from-sky-500 to-white px-4 py-2 hover:bg-sky-600 transition duration-300">View</button>
          <button className='bg-gradient-to-tr from-amber-300 to-gray-100 px-4 py-2 hover:bg-amber-500 transition duration-300'>{props.isActive ? "Lock" : "Unlock"}</button>
        </div>
      </div>
      

    </div>
  )
}

export default UserCard