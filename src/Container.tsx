import React, { useEffect, useState } from 'react'
import "./App.css"
import { Times, Titles } from './types/timeMemo';
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
  // timeメモtitle
  const [titles, setTitles] = useState<Titles | null>(null);
  const [stateAddTitle, setStateAddTitle] = useState(false);
  const [titleId, setTitleId] = useState<string>('1');
  // titleのモーダル
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // timeメモ履歴
  useEffect(() => {
    (async () => {
      const titles = await invoke<Times>("get_all_times", {})
      .catch(err => {
        console.error(err)
        return null
      });
      setTimeHist(titles);
      console.log("times all get");
    })();
  },[isActive])
  // timeメモtitle
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
          console.log("title get");
      })();
  }, [stateAddTitle])
  const  titleChange = (e:  React.ChangeEvent<HTMLSelectElement>) => {
    setTitleId(e.target.value);
  }
  
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
    titleId={titleId}
    setTitleId={setTitleId} 
    titles={titles} 
    titleChange={titleChange}
    setStateAddTitle={setStateAddTitle}
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
  const TaskContent = (() => <Task />)

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