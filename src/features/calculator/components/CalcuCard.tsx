// import { useState } from 'react';
import NumberKeyboard from './element/NumberKeyboard';
import SymbolKeyboard from './element/SymbolKeyboard';
import ResetKeyboard from './element/ResetKeyboard';
import MemoryNumber from './element/MemoryNumber';
import React from 'react'
import { useCommandActions, useNumActions, useSymbolActions } from '../funcs/CalcKeyAction';
import { useKeybind } from '../funcs/KeybordAction';
import { FaEquals } from 'react-icons/fa';

const CalcuCard = (props:{
  number: number, 
  setNumber: React.Dispatch<React.SetStateAction<number>> 
  holdNumber: number, 
  setHoldNumber: React.Dispatch<React.SetStateAction<number>>,
  symbol: string,
  setSymbol: React.Dispatch<React.SetStateAction<string>>,
  memorys: number[],
  setMemorys: React.Dispatch<React.SetStateAction<number[]>>,
}) => {
  function updateNumber (x:number) {
    props.setNumber(props.number*10 + x);
  }
  function resetNumber () {
    props.setHoldNumber(0);
    props.setNumber(0);
    props.setSymbol('');
  }
  function calcuFunction (sym:string) {
    let eqNum = 0;
    if (props.holdNumber!=0 && props.symbol!='' && props.number!=0){
      eqNum = equal();
      props.setHoldNumber(eqNum);
      props.setSymbol(sym);
      props.setNumber(0);
    }
    else if(props.holdNumber!=0 && props.symbol!='' && props.number===0){
      props.setSymbol(sym);
    }
    else{
      props.setHoldNumber(props.number);
        props.setNumber(0);
        props.setSymbol(sym);
    }
  }
  function equal(){
    let anser = 0;
    switch(props.symbol){
      case '+': {
        anser = (props.holdNumber + props.number);
        break;
      }
      case '-': {
        anser = (props.holdNumber - props.number);
        break;
      }
      case '*': {
        anser = (props.holdNumber * props.number);
        break;
      }
      case '/': {
        anser = (props.holdNumber / props.number);
        break;
      }
      case '%': {
        anser = (props.holdNumber % props.number);
        break;
      }
      case '^': {
        anser = (props.holdNumber ** props.number);
        break;
      }
      case '': {
        return props.number;
      }
      default : {
        console.log("規定外の演算子");
      }
    }
    props.setNumber(anser);
    props.setHoldNumber(0);
    props.setSymbol('');
    // console.log("計算終了",props.number);
    return anser;
  }
  function num_mem_switch(index:number) {
    console.log("aaa")
    let mem = props.memorys[index];
    props.setMemorys(
      props.memorys.map((memory, i) => {
        if(i===index){
          return props.number;
        }else{
          return memory;
        }})
    );
    props.setNumber(mem);
  }
  function calcuFuncReset (){
    props.setNumber(props.holdNumber);
    props.setHoldNumber(0);
    props.setSymbol('');
  }
  function resetOnlyNumber(){
    props.setNumber(0);
  }

  useCommandActions(num_mem_switch); // ⌘込みは先に読み込み
  useSymbolActions(calcuFunction, equal, resetOnlyNumber, resetNumber, num_mem_switch); // 記号入力
  useNumActions(updateNumber); // キーボードからの入力 コマンド入力を処理するために,この行を下に


  return (
    <div className="flex flex-col items-center justify-center w-full frame">
      <div className='flex flex-row w-full justify-center'>
        <div className='w-1/4 flex flex-col items-center '>
          <MemoryNumber mem={props.memorys[1]} func={() => num_mem_switch(1)} />
          <MemoryNumber mem={props.memorys[2]} func={() => num_mem_switch(2)} />
        </div>
        <div className='w-1/4'>
          <div >
            <p onClick={calcuFuncReset}> {props.holdNumber}   {props.symbol}</p>
            <p className='text-2xl font-bold text-right'> {props.number} </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex my-1">
              <NumberKeyboard value={1} updateNumber={updateNumber} />
              <NumberKeyboard value={2} updateNumber={updateNumber} />
              <NumberKeyboard value={3} updateNumber={updateNumber} />
            </div>
            <div className="flex my-1">
              <NumberKeyboard value={4} updateNumber={updateNumber} />
              <NumberKeyboard value={5} updateNumber={updateNumber} />
              <NumberKeyboard value={6} updateNumber={updateNumber} />
            </div>
            <div className="flex my-1">
              <NumberKeyboard value={7} updateNumber={updateNumber} />
              <NumberKeyboard value={8} updateNumber={updateNumber} />
              <NumberKeyboard value={9} updateNumber={updateNumber} />
            </div>
            <div className="my-1">
              <NumberKeyboard value={0} updateNumber={updateNumber} />
            </div>
          </div>
        </div>
        <div className='w-1/12'>
        </div>
        <div className='text-red-700 '>
          <button onClick={resetOnlyNumber}>←</button>
        </div>
      </div>


      <div className="my-1">
        <ResetKeyboard value="＊" function={resetNumber} />
        <SymbolKeyboard value='+' function={calcuFunction} equal={equal}/>
        <SymbolKeyboard value='-' function={calcuFunction} equal={equal}/>
        <SymbolKeyboard value='*' function={calcuFunction} equal={equal}/>
        <SymbolKeyboard value='/' function={calcuFunction} equal={equal}/>
        <SymbolKeyboard value='%' function={calcuFunction} equal={equal}/>
        <SymbolKeyboard value='^' function={calcuFunction} equal={equal}/>
        <ResetKeyboard value="＝" function={equal} />
      </div>

      <div className='flex'>
        <div className='bg-dark p-5'></div>
        <div className='bg-darkGreen p-5'></div>
        <div className='bg-mintGreen p-5'></div>
        <div className='bg-base p-5'></div>
      </div>
    </div>
  )
}

export default CalcuCard
