// import React from 'react'
import DeepStamp from './stamps/DeepStamp'
import Green from './Green'
import MiddleStapm from './stamps/MiddleStapm'
import NilStamp from './stamps/NilStamp'
import ShallowStapm from './stamps/ShallowStapm'
import { GetTaskWithTime, GetTaskWithTimes } from '../../../types/timeMemo'
import Stamp from './Stamp'

const WeeklyGrass  = (props:{
  weeklyTime: GetTaskWithTime|undefined,
  id: number
}) => {

  if (props.weeklyTime == undefined ) {
    console.log(props.id);
  }

  const dates: string[] = [];
  function getNext7Days(): string[] {
    const today = new Date();
  
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i); // 今日の日付に i を加算
      dates.push(date.toISOString().split("T")[0]); // YYYY-MM-DD形式で保存
    }
    return dates;
  }
  console.log(getNext7Days());

  return (
    <>
      <div className='flex'>
        {dates.map((date) => (
          <Stamp dayleTime={
            props.weeklyTime.times.find((item)=>item.date == date) || {date: date, time: 0, additions: 0, deletions: 0}
          }/>
        ))}
      </div>
    </>
  )
}

export default WeeklyGrass 