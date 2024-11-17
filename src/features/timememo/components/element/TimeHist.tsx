import React from 'react'
import { invoke } from '@tauri-apps/api/core'
import {GetTime, Times} from '../TimememoCard'
import { useEffect } from 'react';

export const TimeHist = (
    props: {
        timeHist: Times|null, 
        setTimeHist: React.Dispatch<React.SetStateAction<Times | null>>
    }
) => {

    // async function get_all_time() {
    //     const times:Times|null = await invoke<Times>("get_all_times", {})
    //         .catch(err => {
    //             console.log(err);
    //             return null
    //         });
    //     props.setTimeHist(times);
    //     console.log("get all time");
    // }

    // useEffect(() => {
    //     // (async () =>{
    //     //     await get_all_time();
    //     //     console.log("time effect");
    //     // })();
    //     (async () => {
    //         const titles = await invoke<Times>("get_all_times", {})
    //         .catch(err => {
    //             console.error(err)
    //             return null
    //         });
    //         props.setTimeHist(titles);
    //         console.log("title effect");
    //     })();
    // },[])

    return (
        <>
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
        </>
    )
}
