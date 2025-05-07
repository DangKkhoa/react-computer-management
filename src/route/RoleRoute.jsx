import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router';

const RoleRoute = ({ children, allowRoles }) => {

  const { user, isLoading } = useContext(AuthContext);

  if(isLoading) {
    return <div className='p-6 text-center text-gray-800 text-lg'>Loading...</div>
  }

  if(!user) {
    // console.log("User not found");
    return <Navigate to="/login" />
  }

  if(!allowRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }


  return children;

}

export default RoleRoute