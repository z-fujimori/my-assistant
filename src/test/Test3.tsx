import React from 'react'
import { Times } from '../features/timememo/components/TimememoCard'

const Test3 = (props:{
  timeHist: Times | null
}) => {
  return (
    <div>
      <p className='text-3xl'>Test3</p>
      <div className='flex flex-col overflow-x-auto'>
        {props.timeHist ? (
          props.timeHist.times.map((time) => (
            <div key={time.id} className='flex flex-none space-x-2 '>
              <p>{time.title}</p>
              <p>{time.start_time}</p>
              <p>{time.end_time}</p>
            </div>
          ))
        ) : (
          <p>no data</p>
        )}
    </div>
    </div>
  )
}

export default Test3