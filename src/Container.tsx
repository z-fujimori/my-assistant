import React, { useEffect, useState } from 'react'
import "./App.css"
import { Times, Tasks, GetTaskWithTimes } from './types/timeMemo';
import { invoke } from '@tauri-apps/api/core';
import Swipe from './features/swipeWindow/Swipe';
import CalcuCard from './features/calculator/components/CalcuCard';
import DebugComponent from './features/DebugComponent';
import TimememoCard from './features/timememo/components/TimememoCard';
import Task from './features/task/components/Task';

export enum navigation {
  calc = "calculator",
  time = "timememo",
  swipe = "swipetest",
  task = "task"
}

const Container = () => {
  const [stateUpdateRepUrl, setStateUpdateRepUrl] = useState(false);
  // add repo_url in task
  // const [inputRepoUrl, setInputRepoUrl] = useState();
  // calculator
  const [number, setNumber] = useState(0);
  const [holdNumber, setHoldNumber] = useState(0);
  const [symbol, setSymbol] = useState('');
  const [memorys, setMemorys] = useState([0,0,0]);
  // timeメモ 時間情報(経過時間,ボタン状態,スタート時間)
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [start_t, setStart] = useState<string>(""); // スタートした時間
  // timeメモ履歴
  const [timeHist, setTimeHist] = useState<Times|null>(null);
  // timeメモtask
  const [tasks, setTasks] = useState<Tasks | null>(null);
  const [stateAddTask, setStateAddTask] = useState(false);
  const [taskId, setTaskId] = useState<string>('1');
  // taskのモーダル
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // timeメモ履歴
  useEffect(() => {
    (async () => {
      const tasks = await invoke<Times>("get_all_times", {})
      .catch(err => {
        console.error(err)
        return null
      });
      setTimeHist(tasks);
    })();
  },[isActive])
  // timeメモtask
  useEffect(() => {
    // 即時実行関数でuseEffect内で非同期実装
    (async () => {
      const tasks = await invoke<Tasks>("get_all_tasks", {})
      .catch(err => {
        console.error(err)
        return null
      });
      setTasks(tasks);
      setStateAddTask(false);
      setStateUpdateRepUrl(false);
      console.log("task get");
      })();
  }, [stateAddTask, stateUpdateRepUrl])
  const  taskChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
    setTaskId(e.target.value);
  }

  // stampのweekly task with time
  const [weeklyTime, setWeeklyTime] = useState<GetTaskWithTimes|null>(null);
  useEffect(() => {
    (async () => {
      console.log("１週間task　st");
      const tasks = await invoke<GetTaskWithTimes>("get_task_with_time", {"period":{"head_day":"2024-12-01","tail_day":"2024-12-07"}})
        .catch(err => {
          console.error(err, "aa")
          return null
        });
      console.log("１週間task",tasks);
      setWeeklyTime(tasks);
    })();
  },[])
  
  // ページ
  const [currentPage, setCurrentPage] = useState<navigation>(navigation.calc);
  const CalContent = (() => <CalcuCard
    number={number} 
    setNumber={setNumber} 
    holdNumber={holdNumber} 
    setHoldNumber={setHoldNumber}
    symbol={symbol}
    setSymbol={setSymbol}
    memorys={memorys}
    setMemorys={setMemorys}
  />);
  const TimContent = (() => <TimememoCard 
    timeHist={timeHist} 
    setTimeHist={setTimeHist}
    taskId={taskId}
    setTaskId={setTaskId} 
    tasks={tasks} 
    taskChange={taskChange}
    setStateAddTask={setStateAddTask}
    // 時間情報(経過時間,ボタン状態,スタート時間)
    seconds={seconds} 
    setSeconds={setSeconds}
    isActive={isActive}
    setIsActive={setIsActive}
    isPaused={isPaused}
    setIsPaused={setIsPaused}
    start_t={start_t}
    setStart={setStart}
  />);
  const TestContent = (() => <DebugComponent />);
  const TaskContent = (() => <Task 
    tasks={tasks} 
    setStateUpdate={setStateUpdateRepUrl} 
    weeklyTime={weeklyTime}
  />)

  return (
    <>
      <Swipe  
        currentPage = {currentPage}
        setCurrentPage={setCurrentPage}
        CalContent = {CalContent} 
        TimContent={TimContent} 
        TestContent={TestContent}
        TaskContent={TaskContent}
      />
    </>
  )
}

export default Container