import { useEffect, useState } from "react";
import "./App.css";
// import Keyboard from "./features/calculator/components/element/Keyboard";
import CalcuCard from "./features/calculator/components/CalcuCard";
import TimememoCard from "./features/timememo/TimememoCard";
import SwipeComponent from "./features/SwipeComponent";

enum navigation {
  calc = "calculator",
  time = "timememo",
  swipe = "swipetest",
}

function App() {
  const [currentPage, setCurrentPage] = useState<navigation>(navigation.calc);

  let Content = null;
  switch (currentPage) {
    case navigation.calc:
      Content = (() => <CalcuCard />);
      break;
    case navigation.time:
      Content = (() => <TimememoCard />);
      break;
    case navigation.swipe:
      Content = (() => <SwipeComponent />)
      break;
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    console.log("touch start");
  };


  return (
      <div 
        className="m-10" 
        onTouchStart={handleTouchStart}
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
        <Content />
      </div>
  );
}

export default App;
