import { useState } from 'react'
import Keyboard from './element/Keyboard'

const CalcuCard = () => {

    const [number, setNumber] = useState(0);
    function updateNumber (x:number) {
        setNumber(number*10 + x);
    }

    
    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <p> {number} </p>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="flex">
                    <Keyboard value={1} updateNumber={updateNumber} />
                    <Keyboard value={2} updateNumber={updateNumber} />
                    <Keyboard value={3} updateNumber={updateNumber} />
                </div>
                <div className="flex">
                    <Keyboard value={4} updateNumber={updateNumber} />
                    <Keyboard value={5} updateNumber={updateNumber} />
                    <Keyboard value={6} updateNumber={updateNumber} />
                </div>
                <div className="flex">
                    <Keyboard value={7} updateNumber={updateNumber} />
                    <Keyboard value={8} updateNumber={updateNumber} />
                    <Keyboard value={9} updateNumber={updateNumber} />
                </div>
                <div>
                    <Keyboard value={0} updateNumber={updateNumber} />
                </div>
            </div>
        </div>
    )
}

export default CalcuCard
