import React from 'react'
import { DaylyTime, GetTaskWithTime, GetTaskWithTimes } from '../../../types/timeMemo'
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
  // [check]
  // 呼び出し方を後々変える
  getNext7Days();

  return (
    <>
      <div key={"weeklytask"+props.id} className='flex'>
        {dates.map((date) => (
          <Stamp key={`stamp-${props.id}-${date}`} 
            dayleTime={
              props.weeklyTime?.times.find((item)=>item.start_date == date) || {start_date: date, time: 0, additions: 0, deletions: 0}} 
            date={date} 
            taskId={props.id}
          />
        ))}
      </div>
    </>
  )
}

export default WeeklyGrass 