import { DaylyTime } from '@/src/types/timeMemo'
import Stamp from '../Stamp'

const ColumnStamps = (props:{
  id: number
  dates: string[],
  times: DaylyTime[],
}) => {
  return (
    <>
      <div key={"weeklytask"+props.id} className=''>
        {props.dates.map((date) => (
          <Stamp key={`stamp-${props.id}-${date}`} 
            dayleTime={
              props.times.find((item)=>item.start_date == date) || {start_date: date, time: 0, additions: 0, deletions: 0}} 
            date={date} 
            taskId={props.id}
          />
        ))}
      </div>
    </>
  )
}

export default ColumnStamps