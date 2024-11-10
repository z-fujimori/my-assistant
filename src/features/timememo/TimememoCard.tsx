// import React from 'react'
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type InputTime = {
    // id: number,
    title_id: number,
    start_time: string,
    end_time: string
}
type Title = {
    id: number;
    title: string;
}
type Titles = {
    titles: [Title];
}

const TimememoCard = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [start_t, setStart] = useState<string>("");
    // const [end_t, setEnd] = useState<string>("");
    const [titles, setTitles] = useState<Titles | null>(null);

    useEffect(() => {
        // 即時実行関数でuseEffect内で非同期実装
        (async () => {
            const titles = await invoke<Titles>("get_titles", {})
            .catch(err => {
                console.error(err)
                return null
            });
            setTitles(titles)
        })();
    }, [])

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
        postTime(start_t, end_t);
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
            postTime(start_t, end_t)
            setStart("");
        }
        
        setIsActive(false);
        // alert(`お疲れ様でした！ 時間： ${seconds} seconds`);
        setSeconds(0);
    };

    const postTime = async (start:string, end:string) => {
        let data: InputTime = {
            title_id: 0,
            start_time: start,
            end_time: end
        }
        await invoke<void>("handle_add_time", {"time": data})
    };

    return (
        <div className="frame">
            <div>
                {titles ? (
                    titles.titles.map((title) => (
                        <div key={title.id}>
                            {title.title}
                        </div>
                    ))
                ) : (
                    <p>データを読み込み中です...</p>
                )}
            </div>
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
        </div>

    )
}

export default TimememoCard
