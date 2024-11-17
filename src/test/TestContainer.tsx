import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel";
import { Times, Titles } from '../features/timememo/components/TimememoCard';
import Swipe from './Swipe';
import { invoke } from '@tauri-apps/api/core';

import "./App.css";

const TestContainer = () => {
    // timeメモ履歴
    const [timeHist, setTimeHist] = useState<Times|null>(null);
    // timeメモtitle
    const [titles, setTitles] = useState<Titles | null>(null);
    const [stateAddTitle, setStateAddTitle] = useState(false);
    const [titleId, setTitleId] = useState<string>('');
    // titleのモーダル
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
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
                console.log("title effect test");
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
            console.log("title effect テスト");
        })();
    }, [stateAddTitle])

    return (
        <div>
            <Swipe timeHist={timeHist} setTitleId={setTitleId} titles={titles} openModal={openModal} />
        </div>
    )
}

export default TestContainer