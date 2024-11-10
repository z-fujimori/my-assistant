import React, { useEffect, useState } from 'react';

const SwipeComponent: React.FC = () => {
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [gestureStartRotation, setGestureStartRotation] = useState(0);
    const [gestureStartScale, setGestureStartScale] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    useEffect(() => {
        console.log("effect");
        const node = document.querySelector('.frame');

        const render = () => {
            const transformValue = `translate3D(${posX}px, ${posY}px, 0px) rotate(${rotation}deg) scale(${scale})`;
            if (node) {
                // node.style.transform = transformValue;
            }
            console.log(transformValue);
        };

        // Handle wheel events for scaling and translating
        const handleWheel = (e) => {
            e.preventDefault();
            if (e.ctrlKey) {
            setScale((prevScale) => prevScale - e.deltaY * 0.01);
            } else {
            setPosX((prevPosX) => prevPosX - e.deltaX * 2);
            setPosY((prevPosY) => prevPosY - e.deltaY * 2);
            }
            render();
        };
    
        // Handle gesturestart event
        const handleGestureStart = (e) => {
            e.preventDefault();
            setStartX(e.pageX - posX);
            setStartY(e.pageY - posY);
            setGestureStartRotation(rotation);
            setGestureStartScale(scale);
        };
    
        // Handle gesturechange event
        const handleGestureChange = (e) => {
            e.preventDefault();
            setRotation(gestureStartRotation + e.rotation);
            setScale(gestureStartScale * e.scale);
            setPosX(e.pageX - startX);
            setPosY(e.pageY - startY);
            render();
        };
    
        // Handle gestureend event
        const handleGestureEnd = (e) => {
            e.preventDefault();
        };
    
        // Add event listeners
        window.addEventListener('wheel', handleWheel);
        window.addEventListener('gesturestart', handleGestureStart);
        window.addEventListener('gesturechange', handleGestureChange);
        window.addEventListener('gestureend', handleGestureEnd);

        // Cleanup on unmount
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('gesturestart', handleGestureStart);
            window.removeEventListener('gesturechange', handleGestureChange);
            window.removeEventListener('gestureend', handleGestureEnd);
        };
    }, [rotation, scale, posX, posY, gestureStartRotation, gestureStartScale, startX, startY]);

    return (
        <div className="frame" onTouchEnd={()=>console.log("タッチ")}>
            <h1>Gesture & Wheel Event</h1>
        </div>
    );
};

export default SwipeComponent;
