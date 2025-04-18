import React from 'react'
import Tooltip from './Tooltip'

const Button = ({ className, content, tooltip, icon: Icon }) => {
  const [isHovered, setIsHovered] = React.useState(false)
  
  return (
    <div className='relative'>
      <button className={`${className}`} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
        {Icon} {content}
      </button>
      {isHovered && (
        <Tooltip content={tooltip}/>
      )}
      

    </div>
  )
}

export default Button