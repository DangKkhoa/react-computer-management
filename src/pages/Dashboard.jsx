import React from 'react'
import { motion } from "motion/react"
import Header from '../components/Header'
import DashboardCard from '../components/DashboardCard'
import { Boxes, HandCoins, ShoppingCart, Users } from 'lucide-react'
import { Link } from 'react-router'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const DASHBOARD = [
  {
    id: 1,
    title: 'Total Users',
    content: 100,
    icon: Users,
    path: "/users",
    color: 'bg-purple-300'
  },
  {
    id: 2,
    title: 'Total Products',
    content: 200,
    icon: Boxes,
    path: "/inventory",
    color: 'bg-sky-300'
  },
  {
    id: 3,
    title: 'Total Orders',
    content: 150,
    icon: ShoppingCart,
    path: "/orders",
    color: 'bg-green-300'
  },
  {
    id: 4,
    title: 'Total Revenue',
    content: '$5000',
    icon: HandCoins,
    path: "/sale-history",
    color: 'bg-amber-300'
  },
]

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 7000 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 8000 },
  { month: 'Jul', revenue: 7500 },
  { month: 'Aug', revenue: 9000 },
  { month: 'Sep', revenue: 8500 },
  { month: 'Oct', revenue: 9500 },
  { month: 'Nov', revenue: 11000 },
  { month: 'Dec', revenue: 12000 }
]

const topProducts = [
  { id: 1, name: 'MacBook Pro M3', unitsSold: 1200 },
  { id: 2, name: 'Dell XPS 13', unitsSold: 1100 },
  { id: 3, name: 'HP Spectre x360', unitsSold: 950 },
  { id: 4, name: 'Lenovo ThinkPad X1', unitsSold: 870 },
  { id: 5, name: 'Asus ZenBook 14', unitsSold: 850 }
]

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <main className='py-6 px-8 lg:px-12 xl:px-20 max-w-7xl mx-auto'> 
        <motion.div 
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: .2}}
          className='max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6'>
          {DASHBOARD.map(item => (
            <Link key={item.id} to={item.path}>
              <DashboardCard 
                title={item.title}
                content={item.content}
                icon={item.icon}
                color={item.color}
              />
            </Link>
          ))}
        </motion.div>

        {/* Revenue Chart and Top Products */}
        <motion.div 
        initial={{y: 20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{delay: .4}}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
              

          <div>
            <h2 className="text-xl font-semibold mb-4">Top 5 Best-Selling Products</h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-2">#</th>
                  <th className="p-2">Product</th>
                  <th className="p-2">Units Sold</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-300 hover:bg-gray-100">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.unitsSold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
