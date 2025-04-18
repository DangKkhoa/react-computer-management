import React from 'react'

const DashboardCard = ({ title, content, icon:Icon, color }) => {
  const colorMap = {
    'bg-purple-300': 'from-purple-100',
    'bg-blue-300': 'from-sky-100',
    'bg-green-300': 'from-green-100',
    'bg-amber-300': 'from-amber-100'
  }
  const bgClass = `bg-gradient-to-br ${colorMap[color] || 'from-blue-100'}  to-white shadow-md py-8 px-4`

  return (
    <div className={bgClass}>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-semibold mb-4 whitespace-nowrap'>{title}</h2>
          <p className='text-gray-700'>{content}</p>
        </div>

        <div className={`${color} p-2 rounded-full`} style={{backgroundColor: color}}>
          <Icon size={20}/>
        </div>
        
      </div>
    </div>
  )
}

export default DashboardCard