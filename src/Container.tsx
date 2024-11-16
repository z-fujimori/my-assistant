import React, { useEffect, useState } from 'react'
import "./App.css"
import { Times, Titles } from './types/timeMemo';
import { invoke } from '@tauri-apps/api/core';
import Swipe from './features/swipeWindow/Swipe';

const Container = () => {
  // timeメモ履歴
  const [timeHist, setTimeHist] = useState<Times|null>(null);
  // timeメモtitle
  const [titles, setTitles] = useState<Titles | null>(null);
  const [stateAddTitle, setStateAddTitle] = useState(false);
  const [titleId, setTitleId] = useState<string>('');
  // titleのモーダル
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const openModal = () => setIsModalOpen(true);
  // timeメモ履歴
  useEffect(() => {
      // (async () =>{
          //     await get_all_time();
          //     console.log("time effect");
          // })();
          (async () => {
              const titles = await invoke<Times>("get_all_times", {})
              .catch(err => {
                  console.error(err)
                  return null
              });
              setTimeHist(titles);
              console.log("title effect");
          })();
      },[])
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
          console.log("title effect");
      })();
  }, [stateAddTitle])
  
  return (
    <>
      <Swipe timeHist={timeHist} setTimeHist={setTimeHist} titleId={titleId} setTitleId={setTitleId} titles={titles} setStateAddTitle={setStateAddTitle} />
    </>
  )
}

export default Container