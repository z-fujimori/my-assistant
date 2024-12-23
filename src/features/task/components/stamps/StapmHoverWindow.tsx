import React from 'react'

const StapmHoverWindow = (props:{
  time: number,
}) => {
  return (
    <div className='absolute z-10 p-2 -mt-5 -mr-5 bg-gray-800 rounded-lg shadow-md border border-gray-200'>
      {props.time}
    </div>
  )
}

export default StapmHoverWindow