import React, { useEffect, useState } from 'react'
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";
import { Times, Titles } from '../features/timememo/components/TimememoCard';

enum navigation {
    calc = "calculator",
    time = "timememo",
    swipe = "swipetest",
}

const Swipe = (props:{
    timeHist: Times | null,
    setTitleId: React.Dispatch<React.SetStateAction<string>>,
    titles: Titles | null,
    openModal: ()=>void,
}) => {
    const [posX, setPosX] = useState(0);
    const [startX, setStartX] = useState(0);
    const [page, setPage] = useState(0);

    const [currentPage, setCurrentPage] = useState<navigation>(navigation.calc);
    const MOVE_SPEED = 0.1;
    const navArray = [navigation.calc, navigation.time, navigation.swipe];

    console.log("content宣言");
    let Content = null;
    switch (currentPage) {
        case navigation.calc:
            Content = (() => <Test1 />);
            break;
        case navigation.time:
            Content = (() => <Test2  setTitleId={props.setTitleId} titles={props.titles} openModal={props.openModal} />);
            break;
        case navigation.swipe:
            Content = (() => <Test3 timeHist={props.timeHist} />)
            break;
    }

    function resetSwipe () {
        setPosX(0);
        setStartX(0);
    }

    function move_right_page() {
        let next_page;
        if (page >= navArray.length-1) {
            next_page = 0;
            setPage(next_page);
        } else {
            next_page = page + 1;
            setPage(page + 1);
        }
        setCurrentPage(navArray[next_page])
    }
    function move_left_page() {
        let next_page;
        if (page <= 0) {
            next_page = navArray.length-1;
            setPage(navArray.length-1);
        } else {
            next_page = page - 1;
            setPage(page - 1);
        }
        setCurrentPage(navArray[next_page])
    }

    useEffect(() => {
        console.log("effect");
        if (posX > 149) {
            console.log("左へ",posX);
            resetSwipe();
            setCurrentPage(navigation.time);
            move_left_page();
        } else if (posX < -149) {
            console.log("右へ",posX);
            resetSwipe();
            setCurrentPage(navigation.time);
            move_right_page();
        }
        
        const render = () => {
            const transformValue = `translate3D(${posX}px)`;
            console.log(transformValue);
        };

        // Handle wheel events for scaling and translating
        const handleWheel = (e) => {
            e.preventDefault();
            setPosX((prevPosX) => {
                const newPosX = prevPosX - e.deltaX * MOVE_SPEED;
                // posX が MAX_POS_X を超えないように制限
                return newPosX;
            });
            render();
        };
    
        // Handle gesturechange event
        const handleGestureChange = (e) => {
            e.preventDefault();
            setPosX((_prevPosX) => {
                const newPosX = e.pageX - startX;
                // posX が MAX_POS_X を超えないように制限
                return newPosX;
            });
            render();
        };
    
        // Add event listeners
        window.addEventListener('wheel', handleWheel);
        // window.addEventListener('gesturestart', handleGestureStart);
        window.addEventListener('gesturechange', handleGestureChange);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('wheel', handleWheel);
            // window.removeEventListener('gesturestart', handleGestureStart);
            window.removeEventListener('gesturechange', handleGestureChange);
        };
    }, [posX, startX]);

    return (
        <div
            className="m-10"
        >
            <div className="m-3">
            <button
                className="m-2 p-3 bg-dark" 
                onClick={()=>setCurrentPage(navigation.calc)}
                >計算機</button>
            <button 
                className="m-2 p-3 bg-dark" 
                onClick={()=>setCurrentPage(navigation.time)}
            >time memo</button>
            <button 
                className="m-2 p-3 bg-dark" 
                onClick={()=>setCurrentPage(navigation.swipe)}
            >スワイプtest</button>
            </div>
            {/* <CalcuCard /> */}
            <div>posX   : {posX}</div>
            <div>startX : {startX}</div>
            <Content />
        </div>
    )
}

export default Swipe