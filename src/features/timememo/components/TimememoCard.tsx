import React from 'react'
import { useState } from "react";
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
	titleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
	setStateAddTitle: React.Dispatch<React.SetStateAction<boolean>>,
	seconds: number, 
	setSeconds: React.Dispatch<React.SetStateAction<number>>,
	isActive: boolean,
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
	isPaused: boolean,
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
	start_t: string,
	setStart: React.Dispatch<React.SetStateAction<string>>,
}) => {
	// modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className="">
			<div className="frame"></div>
			<Title titleId={props.titleId} setTitleId={props.setTitleId} titles={props.titles} openModal={openModal} titleChange={props.titleChange} />
			{isModalOpen && <AddTitleModal closeModal={closeModal} setStateAddTitle={props.setStateAddTitle} />}
			<div className="mt-5 w-[85%] m-auto right-0 left-0 flex flex-row-reverse flex-wrap md:flex-nowrap justify-between items-start">
				<Timer 
					titleId={props.titleId} 
					seconds={props.seconds} 
					setSeconds={props.setSeconds}
					isActive={props.isActive}
					setIsActive={props.setIsActive}
					isPaused={props.isPaused}
					setIsPaused={props.setIsPaused}
					start_t={props.start_t}
					setStart={props.setStart}
				/>
				<TimeHist timeHist={props.timeHist} setTimeHist={props.setTimeHist} />
			</div>
		</div>

	)
}

export default TimememoCard
