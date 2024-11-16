import React from 'react'
import { useEffect, useState } from "react";
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

const TimememoCard = (props:{
	timeHist: Times | null,
	setTimeHist: React.Dispatch<React.SetStateAction<Times | null>>
	titleId: string,
	setTitleId: React.Dispatch<React.SetStateAction<string>>,
	titles: Titles | null,
	setStateAddTitle: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	// const [end_t, setEnd] = useState<string>("");
	// const [titles, setTitles] = useState<Titles | null>(null);
	// const [stateAddTitle, setStateAddTitle] = useState(false);
	// modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	// title
	// const [titleId, setTitleId] = useState<string>('');
	// const [timeHist, setTimeHist] = useState<Times|null>(null);

	// useEffect(() => {
	//     // 即時実行関数でuseEffect内で非同期実装
	//     (async () => {
	//         const titles = await invoke<Titles>("get_titles", {})
	//         .catch(err => {
	//             console.error(err)
	//             return null
	//         });
	//         setTitles(titles);
	//         setStateAddTitle(false);
	//         console.log("title effect");
	//     })();
	// }, [stateAddTitle])

	return (
		<div className="">
			<div className="frame"></div>
			<Title setTitleId={props.setTitleId} titles={props.titles} openModal={openModal} />
			{isModalOpen && <AddTitleModal closeModal={closeModal} setStateAddTitle={props.setStateAddTitle} />}
			<div className="mt-5 w-[85%] m-auto right-0 left-0 flex flex-row-reverse flex-wrap md:flex-nowrap justify-between items-start">
				<Timer titleId={props.titleId} />
				<TimeHist timeHist={props.timeHist} setTimeHist={props.setTimeHist} />
			</div>
		</div>

	)
}

export default TimememoCard
