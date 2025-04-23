import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import Header from '../components/Header'
import UserCard from '../components/UserCard'
import Search from '../components/Search'
import Modal from '../components/Modal'
import Button from '../components/Button'
import { UserPlus } from 'lucide-react'
import { Outlet } from 'react-router'


const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'ADMIN',
    isActive: true,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com', 
    role: 'SALEPERSON',
    isActive: true,
  }, 
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    role: 'SALEPERSON',
    isActive: true,
  },
  {
    id: 4,
    name: 'Bob Brown',
    email: 'bob.brown@email.com',
    role: 'SALEPERSON',
    isActive: true,
  },
  {
    id: 5,
    name: 'Marry Jane',
    email: 'marry.jane@email.com',
    role: 'ACCOUNTANT',
    isActive: true,
  },
  {
    id: 6,
    name: 'Diana White',
    email: 'diana.white@email.com',
    role: 'ACCOUNTANT',
    isActive: true,
  },
  {
    id: 7,
    name: 'Eve Green',
    email: 'eve.green@email.com',
    role: 'SALEPERSON',
    isActive: true,
  },
  {
    id: 8,
    name: 'Frank Blue',
    email: 'frank.blue@email.com',
    role: 'SALEPERSON',
    isActive: true,
  }
]

const Users = () => {
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [selectedUser, setSelectedUser] = useState({id: null, name: ''});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDeleteUser = (id, name) => {
    // const updatedUsers = filteredUsers.filter(user => user.id !== id);
    // setFilteredUsers(updatedUsers);

    setSelectedUser({id, name});
    
    setIsModalOpen(true);
  }

  const handleConfirmDelete = () => {
    const updatedUsers = USERS.filter(user => user.id !== selectedUser.id);
    setFilteredUsers(updatedUsers);
    setIsModalOpen(false);

    
  }
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  }
  


  return (
    <div
      // initial={{y: 100, opacity: 0}}
      // animate={{y: 0, opacity: 1}}
      // exit={{y: 100, opacity: 0}}
      // transition={{duration: .3}}
    >
      <Header title="Users" />
      <main className='mt-6 p-6 w-full'>
        <div className='mb-6 flex items-center gap-4'>
          <Search 
            placeholder="Search users by name or ID"
            data={USERS}
            setData={setFilteredUsers}
          />
          <Button 
            icon={<UserPlus />}
            className={"text-blue-500"}
            tooltip={"Add User"}
          />
        </div>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
         
            {filteredUsers.map(user => (
              <UserCard 
                key={user.id}
                id={user.id}
                name={user.name}
                role={user.role}
                email={user.email}
                isActive={user.isActive}
                deleteUser={handleDeleteUser}/>
            ))}
          
        </div>

        {isModalOpen && (
          <Modal 
            isOpen={isModalOpen}
            title="Delete User"
            message={`Delete ${selectedUser.name} from the system?`}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
        
      </main>
    </div>
  )
}

export default Users