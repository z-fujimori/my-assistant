import React, { useEffect, useState } from 'react';

const SwipeComponent: React.FC = () => {
    // const [posX, setPosX] = useState(0);
    // const [posY, setPosY] = useState(0);
    // const [startX, setStartX] = useState(0);
    // const [startY, setStartY] = useState(0);

    // const MOVE_SPEED = 0.2;
    // const MAX_POS_X = 150; // 最大のX位置

    // function resetSwipe () {
    //     setPosX(0);
    //     setPosY(0);
    //     setStartX(0);
    //     setStartY(0);
    // }

    // useEffect(() => {
    //     console.log("effect");
    //     if (Math.abs(posX) > 149) {
    //         console.log("オーバー１５０",posX);
    //         resetSwipe();
    //     }
    //     const node = document.querySelector('.frame');

    //     const render = () => {
    //         const transformValue = `translate3D(${posX}px, ${posY}px, 0px)`;
    //         if (node) {
    //             // node.style.transform = transformValue;
    //         }
    //         console.log(transformValue);
    //     };

    //     // Handle wheel events for scaling and translating
    //     const handleWheel = (e) => {
    //         e.preventDefault();
    //         setPosX((prevPosX) => {
    //             const newPosX = prevPosX - e.deltaX * MOVE_SPEED;
    //             // posX が MAX_POS_X を超えないように制限
    //             return Math.min(newPosX, MAX_POS_X);
    //         });
    //         render();
    //     };
    
    //     // Handle gesturestart event
    //     const handleGestureStart = (e) => {
    //         e.preventDefault();
    //         setStartX(e.pageX - posX);
    //     };
    
    //     // Handle gesturechange event
    //     const handleGestureChange = (e) => {
    //         e.preventDefault();
    //         setPosX((prevPosX) => {
    //             const newPosX = e.pageX - startX;
    //             // posX が MAX_POS_X を超えないように制限
    //             return Math.min(newPosX, MAX_POS_X);
    //         });
    //         render();
    //     };
    
    //     // Add event listeners
    //     window.addEventListener('wheel', handleWheel);
    //     window.addEventListener('gesturestart', handleGestureStart);
    //     window.addEventListener('gesturechange', handleGestureChange);

    //     // Cleanup on unmount
    //     return () => {
    //         window.removeEventListener('wheel', handleWheel);
    //         window.removeEventListener('gesturestart', handleGestureStart);
    //         window.removeEventListener('gesturechange', handleGestureChange);
    //     };
    // }, [posX, startX]);

    return (
        <div className="frame" >
            <h1>Gesture & Wheel Event</h1>
        </div>
    );
};

export default SwipeComponent;
