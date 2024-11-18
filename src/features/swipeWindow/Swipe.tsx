import React, { useEffect, useState } from 'react'
import { navigation } from '../../Container';

const Swipe = (props:{
  currentPage: navigation ,
  setCurrentPage: React.Dispatch<React.SetStateAction<navigation>>, 
  CalContent: () => JSX.Element, 
  TimContent: () => JSX.Element, 
  TestContent: () => JSX.Element, 
}) => {
  const [posX, setPosX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [page, setPage] = useState(0);

  // const [currentPage, setCurrentPage] = useState<navigation>(navigation.calc);
  const MOVE_SPEED = 0.1;
  const navArray = [navigation.calc, navigation.time, navigation.swipe];

  console.log("content宣言");
  let Content = props.CalContent;
  switch (props.currentPage) {
    case navigation.calc:
      Content = props.CalContent;
      break;
      case navigation.time:
        Content = props.TimContent;
        break;
        case navigation.swipe:
          Content = props.TestContent;
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
    props.setCurrentPage(navArray[next_page])
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
    props.setCurrentPage(navArray[next_page])
  }

  useEffect(() => {
    console.log("effect");
    if (posX > 149) {
      console.log("左へ",posX);
      resetSwipe();
      props.setCurrentPage(navigation.time);
      move_left_page();
    } else if (posX < -149) {
      console.log("右へ",posX);
      resetSwipe();
      props.setCurrentPage(navigation.time);
      move_right_page();
    }
    
    const render = () => {
      const transformValue = `translate3D(${posX}px)`;
      console.log(transformValue);
    };

    // Handle wheel events for scaling and translating
    const handleWheel = (e:any) => {
      e.preventDefault();
      setPosX((prevPosX) => {
        const newPosX = prevPosX - e.deltaX * MOVE_SPEED;
        // posX が MAX_POS_X を超えないように制限
        return newPosX;
      });
      render();
    };

    // Handle gesturechange event
    const handleGestureChange = (e:any) => {
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
        onClick={()=>props.setCurrentPage(navigation.calc)}
        >計算機</button>
      <button 
        className="m-2 p-3 bg-dark" 
        onClick={()=>props.setCurrentPage(navigation.time)}
      >time memo</button>
      <button 
        className="m-2 p-3 bg-dark" 
        onClick={()=>props.setCurrentPage(navigation.swipe)}
      >デバッグtest</button>
      </div>

      {/* <CalcuCard /> */}
      <Content />
      {/* {props.currentPage == navigation.calc ? (
        <Content />
      ) : (
        <TimContent />
      )} */}

      <div className='mt-3'>
        <p>posX   : {posX}</p>
        <p>startX : {startX}</p>
      </div>
    </div>
  )
}

export default Swipe