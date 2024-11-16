import React from 'react'

import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { InputTime } from "../TimememoCard";

const Timer = (props:{
    titleId: string,
}) => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [start_t, setStart] = useState<string>("");

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
        setStart( new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }) );
        setIsActive(true);
        setIsPaused(false);
    };
    const pauseTimer = () => {
        const end_t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
        postTime(start_t, end_t, props.titleId);
        setStart("");

        setIsPaused(true);
    };

    const restartTimer = () => {
        setStart(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
        setIsPaused(false);
    };

    const stopTimer = () => {
        if (!isPaused) {
            const end_t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
            postTime(start_t, end_t, props.titleId)
            setStart("");
        }
        
        setIsActive(false);
        setSeconds(0);
    };

    const postTime = async (start:string, end:string, title_id: string) => {
        let data: InputTime = {
            title_id: Number(title_id),
            start_time: start,
            end_time: end
        }
        await invoke<void>("handle_add_time", {"time": data})
    };

    return (
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
                        onClick={restartTimer}
                        className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                    >
                        ReStart
                    </button>
                )}
                {isActive && (
                    <button
                        onClick={() => {
                            stopTimer();
                        }}
                        className="hover:bg-[#08051d] hover:duration-300 rounded-md bg-[#1a1157] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                    >
                        Done!!!
                    </button>
                )}
            </div>
        </div>
    )
}

export default Timer