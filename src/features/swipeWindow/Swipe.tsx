import React, { useEffect, useState } from 'react'
import { navigation } from '../../Container';
import NavCard from './components/NavCard';

const Swipe = (props:{
  currentPage: navigation ,
  setCurrentPage: React.Dispatch<React.SetStateAction<navigation>>, 
  CalContent: () => JSX.Element, 
  TimContent: () => JSX.Element, 
  TestContent: () => JSX.Element, 
  TaskContent: () => JSX.Element,
}) => {
  const [posX, setPosX] = useState(0);
  const [page, setPage] = useState(0);
  const [pageChangeing, setPageChangeing] = useState(false);

  // const [currentPage, setCurrentPage] = useState<navigation>(navigation.calc);
  const MOVE_SPEED = 0.1;
  const navArray = [navigation.calc, navigation.time, navigation.swipe, navigation.task];
  let scrollTimeout: number; // スクロール終了イベント

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
    case navigation.task:
      Content = props.TaskContent;
      break;
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
    console.log("posX",posX);
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
    // const render = () => {
    //   const transformValue = `translate3D(${posX}px)`;
    //   console.log(transformValue);
    // };

    const c100 = async (x: number) => {
      if (x > 99) {console.log("100よりでかい")}
      else if (x < -99) {console.log("-100より小さい")}
      await setPosX(0);
    }

    // Handle wheel events for scaling and translating
    const handleWheel = (e:any) => {
      // e.preventDefault(); // デフォルトのスクロール挙動を無効化
    
      
      setPosX((prevPosX) => {
        if (-100 <= prevPosX || prevPosX <= 100 ){
          // console.log("pre",prevPosX);
          const newPosX = prevPosX - e.deltaX * MOVE_SPEED;
          return newPosX;
        } else {
          return prevPosX;
        }
        // console.log("new",newPosX);
        // console.log("");
        // posX が MAX_POS_X を超えないように制限
      });
      

      // c100(posX);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        console.log('Scroll ended!', e);
        setPosX(0);

      }, 20); // OOms間イベントが発生しなければスクロール終了と判定
      // render();
    };



    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(()=>{
    let isMounted = true; // マウント状態を追跡

    const changePage = async () => {
      if (!pageChangeing) {
        setPageChangeing(true);

        if (posX > 100) {
            console.log("左へ", posX);
            setPosX(0);
            props.setCurrentPage(navigation.time);
            move_left_page();
        } else if (posX < -100) {
            console.log("右へ", posX);
            setPosX(0);
            props.setCurrentPage(navigation.time);
            move_right_page();
        }

        if (isMounted) {
            setPageChangeing(false); // コンポーネントがマウント中の場合のみ状態を更新
        }
      }
    };

    changePage();

    return () => {
        isMounted = false; // クリーンアップ時にフラグをリセット
    };
  },[posX])

  return (
    <div
      className="m-10 text-gray-300"
    >

      <div className='mt-3'>
        <p>posX   : {posX}</p>
      </div>
      
      <div className="m-3 flex">
        <NavCard text="電卓" clickIvent={()=>props.setCurrentPage(navigation.calc)} />
        <NavCard text="timeメモ" clickIvent={()=>props.setCurrentPage(navigation.time)} />
        <NavCard text="デバッグtest" clickIvent={()=>props.setCurrentPage(navigation.swipe)} />
        <NavCard text="タスク編集" clickIvent={()=>props.setCurrentPage(navigation.task)} />
      </div>

      {/* <CalcuCard /> */}
      <Content />
      {/* {props.currentPage == navigation.calc ? (
        <Content />
      ) : (
        <TimContent />
      )} */}

    </div>
  )
}

export default Swipe