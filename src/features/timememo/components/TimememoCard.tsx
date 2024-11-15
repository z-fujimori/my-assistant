// import React from 'react'
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import AddTitleModal from "./element/AddTitleModal";
import { TimeHist } from "./element/TimeHist";
import Title from "./element/Title";
import Timer from "./element/Timer";

export type InputTime = {
    // id: number,
    title_id: number,
    start_time: string,
    end_time: string
}
export type GetTime = {
    id: number,
    title_id: number,
    title: string,
    start_time: string,
    end_time: string
}
export type Times = {
    times: [GetTime]
}
type Title = {
    id: number;
    title: string;
}
export type Titles = {
    titles: [Title]
}

const TimememoCard = () => {
    // const [end_t, setEnd] = useState<string>("");
    const [titles, setTitles] = useState<Titles | null>(null);
    const [stateAddTitle, setStateAddTitle] = useState(false);
    // modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    // title
    const [titleId, setTitleId] = useState<string>('');
    const titleChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setTitleId(e.target.value);
    }
    const [timeHist, setTimeHist] = useState<Times|null>(null);

    useEffect(() => {
        // 即時実行関数でuseEffect内で非同期実装
        (async () => {
            const titles = await invoke<Titles>("get_titles", {})
            .catch(err => {
                console.error(err)
                return null
            });
            setTitles(titles);
            setStateAddTitle(false);
            console.log("title effect");
        })();
    }, [stateAddTitle])

    return (
        <div className="">
            <div className="frame"></div>
            <Title titleChange={titleChange} titles={titles} openModal={openModal} />
            <div className="absolute mt-5 w-[85%] m-auto right-0 left-0 flex flex-row-reverse flex-wrap md:flex-nowrap justify-between items-start">
                <Timer titleId={titleId} />
                <TimeHist timeHist={timeHist} setTimeHist={setTimeHist} />
            </div>
            {isModalOpen && <AddTitleModal closeModal={closeModal} setStateAddTitle={setStateAddTitle} />}
        </div>

    )
}

export default TimememoCard
