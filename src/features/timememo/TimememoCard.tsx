// import React from 'react'
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type Time = {
    id: number,
    title: string,
    start_time: number,
    end_time: number
    // start_time: Date,
    // end_time: Date
}

const TimememoCard = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    useEffect(() => {
        let intervalId: any; // わからなかったので、、、
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
        setIsActive(false);
        alert(`お疲れ様でした！ 時間： ${seconds} seconds`);
        setSeconds(0);
    };

    const postTime = async () => {
        let data: Time = {
            id:2,
            title:"test",
            start_time: 23,
            end_time: 55
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
                                    postTime();
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
