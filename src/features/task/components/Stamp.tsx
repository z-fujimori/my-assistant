import React from 'react'
import { DaylyTime, GetTaskWithTime } from '../../../types/timeMemo'
import NilStamp from './stamps/NilStamp';
import ShallowStapm from './stamps/ShallowStapm';
import MiddleStapm from './stamps/MiddleStapm';
import DeepStamp from './stamps/DeepStamp';

const Stamp = (props:{
  dayleTime: DaylyTime|undefined,
  date: string,
  taskId: number
}) => {
  const timeValue = (props.dayleTime?.start_date ? props.dayleTime.time : 0);

  let StampComponent: ()=>JSX.Element;
  if (timeValue == 0) {
    StampComponent = (() => (<NilStamp />))
  } else if (timeValue < 10800) { // 3時間以内
    StampComponent = (() => <ShallowStapm />)
  } else if (timeValue < 21600) { // // 6時間以内
    StampComponent = (() => <MiddleStapm />)
  } else {
    StampComponent = (() => <DeepStamp />)
  }


  return (
    <div>
      <StampComponent />
    </div>
  )
}

export default Stamp