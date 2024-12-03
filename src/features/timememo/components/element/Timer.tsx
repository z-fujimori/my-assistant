import React from 'react'

import { invoke } from "@tauri-apps/api/core";
import { useEffect } from "react";
import { InputTime } from '../../../../types/timeMemo';

const Timer = (props:{
    taskId: string,
    seconds: number, 
	setSeconds: React.Dispatch<React.SetStateAction<number>>,
	isActive: boolean,
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
	isPaused: boolean,
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
	start_t: string,
	setStart: React.Dispatch<React.SetStateAction<string>>,
}) => {

    useEffect(() => {
        let intervalId: number;
        if (props.isActive && !props.isPaused) {
        intervalId = setInterval(() => {
            props.setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [props.isActive, props.isPaused]);

    function formatTime(totalSeconds: number){
        const minutes = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };
    const startTimer = () => {
        props.setStart( new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }) );
        props.setIsActive(true);
        props.setIsPaused(false);
    };
    const pauseTimer = () => {
        const end_t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
        postTime(props.start_t, end_t, props.taskId);
        props.setStart("");

        props.setIsPaused(true);
    };

    const restartTimer = () => {
        props.setStart(new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
        props.setIsPaused(false);
    };

    const stopTimer = () => {
        if (!props.isPaused) {
            const end_t = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
            postTime(props.start_t, end_t, props.taskId)
            props.setStart("");
        }
        props.setIsPaused(false);
        props.setIsActive(false);
        props.setSeconds(0);
    };

    const postTime = async (start:string, end:string, task_id: string) => {
        let data: InputTime = {
            task_id: Number(task_id),
            start_time: start,
            end_time: end
        }
        await invoke<void>("handle_add_time", {"time": data})
    };

    return (
        <div className="md:w-[68%] w-full lg:ml-10 md:ml-5 ml-0">
            <p className="leading-tight md:mt-0 mt-[-20px] xl:text-[260px] lg:text-[200px] md:text-[140px] text-[100px]  m-auto h-fit md:w-0 md:m-0 text-gray-300">
                {formatTime(props.seconds)}
            </p>
            <div className="flex justify-between border-t border-gray-800">
                {!props.isActive && !props.isPaused && (
                    <button
                        onClick={() => {
                            startTimer();
                        }}
                        className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                    >
                        Start
                    </button>
                )}
                {props.isActive && !props.isPaused && (
                    <button
                        onClick={pauseTimer}
                        className="hover:opacity-80 hover:duration-300 rounded-md bg-[#181818] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                    >
                        Pause
                    </button>
                )}
                {props.isPaused && (
                    <button
                        onClick={restartTimer}
                        className="hover:opacity-80 hover:duration-300 rounded-md bg-[#333333] md:w-[120px] w-[80px] md:p-5 p-2 mt-5"
                    >
                        ReStart
                    </button>
                )}
                {props.isActive && (
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