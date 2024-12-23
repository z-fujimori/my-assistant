// import React from 'react'
import ColumnStamps from "../../../task/components/stamps/ColumnStamps";
import { DaylyTime, DaylyTimes } from "@/src/types/timeMemo"

const TimeStamp = (props:{
  dailyTime: DaylyTimes|null,
  head_day: string,
  tail_day: string,
}) => {

  const zeroPad = (num: number): string => String(num).padStart(2, "0");
  function generateDateArray(startDate: string, endDate: string): string[][] {
    const dates: string[][] = [];
    let week: string[] = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);
    
    let i = 0;
    while (currentDate <= lastDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // 月は0始まり
      const day = currentDate.getDate() + 1;
      week.push(`${year}-${zeroPad(month)}-${zeroPad(day)}`);
      currentDate.setDate(currentDate.getDate() + 1); // 次の日へ
      i++;
      if (i%7 == 0) {
        dates.push(week);
        week = [];
      }
    }
  
    return dates;
  }
  const dateArray = generateDateArray(props.tail_day, props.head_day);
  console.log("2ヶ月",dateArray);

  let new_times: DaylyTime[][] = Array.from({length: dateArray.length}, () => []);
  for (let timesIndex=0; timesIndex < props.dailyTime!.times.length; timesIndex++){
    for (let dateArrayIndex=dateArray.length-1; dateArrayIndex >= 0; dateArrayIndex--){
      if ((props.dailyTime?.times[timesIndex]!==undefined)&&(dateArray[dateArrayIndex][0] <= props.dailyTime?.times[timesIndex].start_date!)){
        console.log(dateArray[dateArrayIndex][0]);
        new_times[dateArrayIndex].push(props.dailyTime?.times[timesIndex]);
        break;
      }
    }
  }
  console.log(new_times);

  return (
    <div className="flex">
      {new_times.map((times, index) => (
        <ColumnStamps id={index} dates={dateArray[index]} times={times} /> 
      ))}
    </div>
  )
}

export default TimeStamp