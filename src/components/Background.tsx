import { useState } from 'react'

interface BackgroundProps {
  className?: string
  children: any
}

const defaultStyle = 'top-0 left-0 overflow-hidden'

export const Background = ({ children, className = defaultStyle }: BackgroundProps) => {
  const [circlePos, setCirclePos] = useState({ x: 152, y: 460, r: 321 })
  const [translate, setTranslate] = useState('translate(30,100)')

  return (
    <div className={className}>
      <div className='w-full h-full absolute overflow-hidden '>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' className=' fill-none stroke-gray-900/50 stroke-2 w-full'>
          <path
            d='m-000 308 1103-104M-39 201l1111 474' style={{
              transform: translate,
              transitionDuration: '10000ms'
            }}
          />
          <circle
            cx={500} cy={circlePos.y} r={circlePos.r} style={{
              transform: translate,
              transitionDuration: '10000ms'
            }}
          />
          <circle cx={883} cy={518} r={253} />
        </svg>
      </div>
      <div className='z-10 relative'>
        {children}
      </div>
    </div>
  )
}
