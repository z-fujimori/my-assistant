import { useState } from "react";
import "./App.css";
// import Keyboard from "./features/calculator/components/element/Keyboard";
import CalcuCard from "./features/calculator/components/CalcuCard";
import TimememoCard from "./features/timememo/TimememoCard";

enum navigation {
  calc = "calculator",
  time = "timememo",
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
  }


  return (
      <div className="m-10">
        <div className="m-3">
          <button
            className="m-2 p-3 bg-dark" 
            onClick={()=>setCurrentPage(navigation.calc)}
            >計算機</button>
          <button 
            className="m-2 p-3 bg-dark" 
            onClick={()=>setCurrentPage(navigation.time)}
          >time memo</button>
        </div>
        {/* <CalcuCard /> */}
        <Content />
      </div>
  );
}

export default App;
