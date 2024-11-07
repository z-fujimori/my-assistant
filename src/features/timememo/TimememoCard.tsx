// import React from 'react'
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type InputTime = {
    // id: number,
    title: string,
    start_time: string,
    end_time: string,
    second: number
    // start_time: Date,
    // end_time: Date
}

const TimememoCard = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [start_t, setStart] = useState<string>("");
    // const [end_t, setEnd] = useState<string>("");
    useEffect(() => {
        let intervalId: number;
        if (isActive && !isPaused) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isActive, isPaused]);

    function formatTime(totalSeconds: number){
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };
    const startTimer = () => {
        setStart( new Date().toLocaleTimeString() );
        setIsActive(true);
        setIsPaused(false);
    };
    const pauseTimer = () => {
        setIsPaused(true);
    };

    const resumeTimer = () => {
        setIsPaused(false);
    };

    const stopTimer = () => {
        const end_t = new Date().toLocaleTimeString();

        postTime(start_t, end_t, seconds)
        setStart("");
        
        setIsActive(false);
        // alert(`お疲れ様でした！ 時間： ${seconds} seconds`);
        setSeconds(0);
    };

    const postTime = async (start:string, end:string, time: number) => {
        let data: InputTime = {
            title:"test",
            start_time: start,
            end_time: end,
            second: time
        }
        await invoke<void>("handle_add_time", {"time": data})
    };

    return (
        <>
            <div className="absolute mt-5 w-[85%] m-auto right-0 left-0 flex flex-row-reverse flex-wrap md:flex-nowrap justify-between items-start">
                <div className="md:w-[68%] w-full lg:ml-10 md:ml-5 ml-0">
                    <p className="leading-tight md:mt-0 mt-[-20px] xl:text-[260px] lg:text-[200px] md:text-[140px] text-[100px]  m-auto h-fit md:w-0 md:m-0 text-gray-300">
                        {formatTime(seconds)}
                    </p>
                    <div className="flex justify-between border-t border-gray-800">
                        {!isActive && !isPaused && (
                            <button
                                onClick={() => {
                                    startTimer();
                                }}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                Start
                            </button>
                        )}
                        {isActive && !isPaused && (
                            <button
                                onClick={pauseTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#181818] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                Pause
                            </button>
                        )}
                        {isPaused && (
                            <button
                                onClick={resumeTimer}
                                className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                ReStart
                            </button>
                        )}
                        {isActive && (
                            <button
                                onClick={() => {
                                    stopTimer();
                                    // postTime();
                                }}
                                className="hover:bg-[#08051d] hover:duration-300 rounded-md bg-[#1a1157] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                            >
                                Done!!!
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}

export default TimememoCard
