import React from 'react'
import { useState } from "react";
import AddTaskModal from './element/AddTaskModal';
import { TimeHist } from "./element/TimeHist";
import Task from "./element/Task";
import Timer from "./element/Timer";
import { DaylyTimes, Tasks, Times } from '../../../types/timeMemo';
import TimeStamp from './element/TimeStamp';

const TimememoCard = (props:{
	timeHist: Times | null,
	setTimeHist: React.Dispatch<React.SetStateAction<Times | null>>
	taskId: string,
	setTaskId: React.Dispatch<React.SetStateAction<string>>,
	tasks: Tasks | null,
	taskChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, 
	setStateAddTask: React.Dispatch<React.SetStateAction<boolean>>,
	seconds: number, 
	setSeconds: React.Dispatch<React.SetStateAction<number>>,
	isActive: boolean,
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
	isPaused: boolean,
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>,
	start_t: string,
	setStart: React.Dispatch<React.SetStateAction<string>>,
	dailyTime: DaylyTimes|null,
	head_day: string,
	tail_day: string
}) => {
	// modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className="">
			<div className="frame"></div>
			<Task taskId={props.taskId} setTaskId={props.setTaskId} tasks={props.tasks} openModal={openModal} taskChange={props.taskChange} />
			{isModalOpen && <AddTaskModal closeModal={closeModal} setStateAddTask={props.setStateAddTask} />}
			<div className="mt-5 w-[85%] m-auto right-0 left-0 flex flex-row-reverse flex-wrap md:flex-nowrap justify-between items-start">
				<Timer 
					taskId={props.taskId} 
					seconds={props.seconds} 
					setSeconds={props.setSeconds}
					isActive={props.isActive}
					setIsActive={props.setIsActive}
					isPaused={props.isPaused}
					setIsPaused={props.setIsPaused}
					start_t={props.start_t}
					setStart={props.setStart}
				/>
				<TimeStamp dailyTime={props.dailyTime} head_day={props.head_day} tail_day={props.tail_day} />
				<TimeHist timeHist={props.timeHist} setTimeHist={props.setTimeHist} />
			</div>
		</div>

	)
}

export default TimememoCard
