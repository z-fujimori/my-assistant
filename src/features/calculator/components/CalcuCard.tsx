import { useState } from 'react';
import NumberKeyboard from './element/NumberKeyboard';
import SymbolKeyboard from './element/SymbolKeyboard';
import ResetKeyboard from './element/ResetKeyboard';
import MemoryNumber from './element/MemoryNumber';

const CalcuCard = () => {

    const [number, setNumber] = useState(0);
    const [holdNumber, setHoldNumber] = useState(0);
    const [symbol, setSymbol] = useState('');
    const [memorys, setMemory] = useState([0,0,0]);
    function updateNumber (x:number) {
        setNumber(number*10 + x);
    }
    function resetNumber () {
        setHoldNumber(0);
        setNumber(0);
        setSymbol('');
    }
    function calcuFunction (sym:string) {
        let eqNum = 0;
        if (holdNumber!=0 && symbol!='' && number!=0){
            eqNum = equal();
            setHoldNumber(eqNum);
            setSymbol(sym);
            setNumber(0);
        }
        else if(holdNumber!=0 && symbol!='' && number===0){
            setSymbol(sym);
        }
        else{
            setHoldNumber(number);
            setNumber(0);
            setSymbol(sym);
        }
    }
    function equal(){
        let anser = 0;
        switch(symbol){
            case '+': {
                anser = (holdNumber + number);
                break;
            }
            case '-': {
                anser = (holdNumber - number);
                break;
            }
            case '*': {
                anser = (holdNumber * number);
                break;
            }
            case '/': {
                anser = (holdNumber / number);
                break;
            }
            case '%': {
                anser = (holdNumber % number);
                break;
            }
            case '^': {
                anser = (holdNumber ** number);
                break;
            }
            case '': {
                return number;
            }
            default : {
                console.log("規定外の演算子");
            }
        }
        setNumber(anser);
        setHoldNumber(0);
        setSymbol('');
        console.log("計算終了",number);
        return anser;
    }
    function num_mem_switch(index:number) {
        let mem = memorys[index];
        setMemory(
            memorys.map((memory, i) => {
                if(i===index){
                    return number;
                }else{
                    return memory;
                }})
        );
        setNumber(mem);
    }
    function calcuFuncReset (){
        setNumber(holdNumber);
        setHoldNumber(0);
        setSymbol('');
    }
    function resetOnlyNumber(){
        setNumber(0);
    }


    return (
        <div className="flex flex-col items-center justify-center w-full frame">
            <div className='flex flex-row w-full justify-center'>
                <div className='w-1/4 flex flex-col items-center '>
                    <MemoryNumber mem={memorys[1]} func={() => num_mem_switch(1)} />
                    <MemoryNumber mem={memorys[2]} func={() => num_mem_switch(2)} />
                </div>
                <div className='w-1/4'>
                    <div >
                        <p onClick={calcuFuncReset}> {holdNumber}   {symbol}</p>
                        <p className='text-2xl font-bold text-right'> {number} </p>
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
                    <button onClick={resetOnlyNumber}>x</button>
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
