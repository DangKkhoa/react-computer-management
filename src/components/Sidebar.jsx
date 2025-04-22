import { Boxes, ChartArea, ChartGantt, Menu, ShoppingBag, ShoppingCart, UserCheck, Users } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import { NavLink } from 'react-router'
import Tooltip from './Tooltip'


const navItems = [
  {path: "/", name: "Shop", icon: ShoppingBag, active: false, roles: ["*"]},
  {path: "/dashboard", name: "Dashboard", icon: ChartArea, active: false, roles: ["ADMIN"]},
  {path: "/orders", name: "Orders", icon: ShoppingCart, active: false, roles: ["ADMIN", "SALEPERSON"]},
  {path: "/inventory", name: "Inventory", icon: Boxes, active: false, roles: ["ADMIN", "SALEPERSON"]},
  {path: "/customers", name: "Customers", icon: Users, active: false, roles: ["ADMIN", "SALEPERSON"]},
  {path: "/users", name: "Users", icon: UserCheck, active: false, roles: ["ADMIN"]},
  {path: "/sale-history", name: "Sale History", icon: ChartGantt, active: false, roles: ["ADMIN", "ACCOUNTANT"]},
]
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Sidebar toggled", isSidebarOpen);
    
  }

  return (
    <motion.div 
      className={`relative h-screen w-20 md:w-64  border-r border-gray-300 shadow-xl ${isSidebarOpen && "overflow-hidden"} p-4 transition-all duration-300 ease-in-out `}
      style={{width: isSidebarOpen ? "256px" : "80px"}}
      animate={{width: isSidebarOpen ? "256px" : "80px"}}>
        <motion.button 
          className='hover:bg-sky-200 rounded-full p-2 '
          whileTap={{scale: 0.9}}
          whileHover={{scale: 1.1}}
          onClick={handleSidebarToggle}
        >
          <Menu size={24} />
        </motion.button>
        <nav className='text-md '>
          {navItems.map(item => (
            <NavLink 
              to={item.path}
              className={({isActive}) => "group flex mt-2 px-2 py-4 " + (isActive ? "bg-gradient-to-bl from-sky-200 to-gray-100 text-gray-700" : "hover:bg-sky-200")}
            >
                {<item.icon size={24} style={{minWidth: "24px"}} />}
                {!isSidebarOpen && (
                  <div className=' hidden group-hover:block z-1000'> 
                    <Tooltip content={item.name} />
                  </div>
                )}
                {/* {!isSidebarOpen && (<Tooltip content={item.name} />)} */}
                <span className={`ml-2 ${!isSidebarOpen ? "opacity-0" : "opacity-100"} delay-300 whitespace-nowrap`}>{item.name}</span>
            </NavLink>
          ))}
        </nav>
    </motion.div>
  )
}

export default Sidebar