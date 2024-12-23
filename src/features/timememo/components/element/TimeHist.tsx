import React from 'react'
import { Times } from "../../../../types/timeMemo"

export const TimeHist = (
    props: {
        timeHist: Times|null, 
        setTimeHist: React.Dispatch<React.SetStateAction<Times | null>>
    }
) => {

    return (
        <>
            <div className='flex flex-col overflow-x-auto'>
                {props.timeHist ? (
                    props.timeHist.times.map((time) => (
                        <div key={time.id} className='flex flex-none space-x-2 '>
                            <p>{time.task}</p>
                            <p>{time.start_time}</p>
                            <p>{time.end_time}</p>
                        </div>
                    ))
                ) : (
                    <p>no data</p>
                )}
            </div>
        </>
    )
}
