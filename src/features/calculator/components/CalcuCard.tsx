import { useState } from 'react';
import NumberKeyboard from './element/NumberKeyboard';
import SymbolKeyboard from './element/SymbolKeyboard';

const CalcuCard = () => {

    const [number, setNumber] = useState(0);
    function updateNumber (x:number) {
        setNumber(number*10 + x);
    }
    function resetNumber () {
        setNumber(0);
    }

    
    return (
        <div className="flex flex-col items-center justify-center">
            <div >
                <p> {number} </p>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="flex">
                    <NumberKeyboard value={1} updateNumber={updateNumber} />
                    <NumberKeyboard value={2} updateNumber={updateNumber} />
                    <NumberKeyboard value={3} updateNumber={updateNumber} />
                </div>
                <div className="flex">
                    <NumberKeyboard value={4} updateNumber={updateNumber} />
                    <NumberKeyboard value={5} updateNumber={updateNumber} />
                    <NumberKeyboard value={6} updateNumber={updateNumber} />
                </div>
                <div className="flex">
                    <NumberKeyboard value={7} updateNumber={updateNumber} />
                    <NumberKeyboard value={8} updateNumber={updateNumber} />
                    <NumberKeyboard value={9} updateNumber={updateNumber} />
                </div>
                <div>
                    <NumberKeyboard value={0} updateNumber={updateNumber} />
                </div>
                <div>
                    <SymbolKeyboard value="＊" function={resetNumber} />
                </div>
            </div>
        </div>
    )
}

export default CalcuCard
