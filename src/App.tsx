import { useState } from "react";
import "./App.css";
import Keyboard from "./features/calculator/components/element/Keyboard";
import CalcuCard from "./features/calculator/components/CalcuCard";

function App() {

  async function greet() {

  }

  return (
      <div>
        <h1> Welcom </h1>

        <CalcuCard />
      </div>
  );
}

export default App;
