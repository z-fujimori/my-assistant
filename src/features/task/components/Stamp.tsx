import React from 'react'
import { DaylyTime, GetTaskWithTime } from '../../../types/timeMemo'
import NilStamp from './stamps/NilStamp';
import ShallowStapm from './stamps/ShallowStapm';
import MiddleStapm from './stamps/MiddleStapm';

const Stamp = (props:{
  dayleTime: DaylyTime,
}) => {
  const timeValue = (props.dayleTime.time ? props.dayleTime.time : 0);

  let StampComponent;
  if (timeValue == 0) {
    StampComponent = <NilStamp />
  } else if (timeValue < 10800) { // 3時間以内
    StampComponent = <ShallowStapm />
  } else if (timeValue < 21600) { // // 6時間以内
    StampComponent = <MiddleStapm />
  } else {
    StampComponent = <MiddleStapm />
  }

  return (
    <>

    </>
  )
}

export default Stamp