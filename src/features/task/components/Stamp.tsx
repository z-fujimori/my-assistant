import { useEffect, useRef, useState } from 'react'
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
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    // if (timeoutRef.current) {
    //   clearTimeout(timeoutRef.current);
    // }
    // setIsHovered(true);
    timerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log("a");
      setIsHovered(false);
    }, 50); // 50ミリ秒のディレイを設定
  };

  // useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
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
    <div className='pr-1'>
      <div
        ref={containerRef}
        className="relative inline-block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        <div>
          <StampComponent />
        </div>

        {isHovered ? 
          <div
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave} 
            className='absolute z-10 w-40 p-2 -mt-5 -mr-5 translate-x-2 bg-gray-800 rounded-lg shadow-md border border-gray-200'>
            <div className="text-gray-200">
              <span className='text-gray-500'>{props.date}:</span> {props.dayleTime?.time}min
            </div>
          </div>
        : <></>}
      </div>
    </div>
  )
}

export default Stamp