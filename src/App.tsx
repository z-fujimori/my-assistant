import { useState } from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";

function App() {
  const [number, setNumber] = useState(0);

  const updateNumber = ( x:number ): void => setNumber(x);

  async function greet() {

  }

  return (
    <main className="container">
      <div>
        <h1> Welcom </h1>
        <p> {number} </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex">
          <Keyboard value={1} updateNumber={updateNumber(1)} />
          <Keyboard value={2} updateNumber={updateNumber(2)} />
          <Keyboard value={3} updateNumber={updateNumber(3)} />
        </div>
        <div className="flex">
          <Keyboard value={4} updateNumber={updateNumber(4)} />
          <Keyboard value={5} updateNumber={updateNumber(5)} />
          <Keyboard value={6} updateNumber={updateNumber(6)} />
        </div>
        <div className="flex">
          <Keyboard value={7} updateNumber={updateNumber(7)} />
          <Keyboard value={8} updateNumber={updateNumber(8)} />
          <Keyboard value={9} updateNumber={updateNumber(9)} />
        </div>
        <div>
          <Keyboard value={0} updateNumber={updateNumber(0)} />
        </div>
      </div>

    </main>
  );
}

export default App;
